import { useEffect, useRef, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useQuery, gql } from "@apollo/client";

// utils
import { apolloClient } from "@root/utils";

// components
import { MainLayout } from "@root/components/layouts";
import { Breadcrumbs, ProductHeader, ProductCard } from "@root/components/features";
import Filters from "./Filters";

const productQuery = gql`
  query ($whereAnd: [products_bool_exp!], $offset: Int = 0) {
    products(where: { _and: $whereAnd }, limit: 21, offset: $offset) {
      uid
      title
      subTitle: sub_title
      label
      price
      images
      productAnotherColors: product_another_colors
      inStock: in_stock
      bestSeller: best_seller
      comingSoon: coming_soon
    }
  }
`;

export interface HomeProps {
  filterIds: string[];
  navigation: INavigation;
  navigationList: INavigation[];
  categoryList: ICategory[];
  filterOptions: IFilterOption[];
}

const Home: NextPage<HomeProps> = ({
  navigationList,
  filterIds,
  navigation,
  categoryList,
  filterOptions,
}) => {
  const { data, fetchMore, refetch } = useQuery<{ products?: IProduct[] }>(productQuery, {
    variables: { whereAnd: filterIds.map((id) => ({ filters: { _regex: id } })) },
  });

  const stateRef = useRef({ offset: 0, productCount: 0, fetching: true });
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  const [canLoadMore, setCanLoadMore] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    refetch().then(() => setFetching(false));
  }, [refetch, filterIds]);

  useEffect(() => {
    stateRef.current.fetching = fetching;
    stateRef.current.offset = data?.products?.length || 0;
  }, [fetching, data?.products]);

  useEffect(() => {
    setCanLoadMore((data?.products?.length || 0) < stateRef.current.productCount);
  }, [data?.products]);

  useEffect(() => {
    // when no more data to load, stop the observer
    if (!canLoadMore) return;
    if (fetching || !spinnerRef.current) return;
    const snipperEl = spinnerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !stateRef.current.fetching) {
          // [stateRef.current.fetching] will prevent call [fetchMore] multiple times
          // Case: user scroll down, call [fetchMore]
          //       during api is calling, user scroll up, and scrol down again,
          //       without [stateRef.current.fetching], [fetchMore] will be fired 1 more time
          stateRef.current.fetching = true;
          fetchMore({ variables: { offset: stateRef.current.offset } });
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(snipperEl);
    return () => observer.unobserve(snipperEl);
  }, [canLoadMore, fetching, fetchMore]);

  return (
    <MainLayout navigationList={navigationList}>
      <Breadcrumbs navigation={navigation} />
      <ProductHeader
        title={navigation.title || ""}
        filterIds={filterIds}
        setProductCount={(count) => {
          stateRef.current.productCount = count;
          count && setCanLoadMore((data?.products?.length || 0) < count);
        }}
      />

      <div className="grow-1 flex">
        {/* Filters */}
        <div className="shrink-0 basis-[260px]">
          <Filters
            filterIds={filterIds}
            categoryList={categoryList || []}
            filterOptions={filterOptions}
          />
        </div>

        <div className="page-spacing grow-1 shrink-1 w-full py-4">
          {/* Product List */}
          <div className="grid grid-cols-3 gap-4">
            {(data?.products || []).map((product) => (
              <ProductCard key={product.uid} loading={fetching} product={product} />
            ))}
          </div>

          {/* load more */}
          {canLoadMore && (
            <div ref={spinnerRef} className="flex justify-center py-10">
              <div className="spinner" />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { path, navigationUid } = req.query;

  const navigationFields = `
    uid
    label
    title
    path
    level
    levelOrder: level_order
    urlPath: url_path
    filterIds: filter_ids
  `;

  const { data } = await apolloClient.query<{
    navigation: INavigation;
    navigationList: INavigation[];
    categoryList: ICategory[];
    filterOptions: IFilterOption[];
  }>({
    query: gql`
      query {
        navigation: navigations_by_pk(uid: "${navigationUid}") {
          ${navigationFields}

          parent: navigation {
            ${navigationFields}

            parent: navigation {
              ${navigationFields}
            }
          }
        }

        navigationList: navigations (where: {level: {_eq: "root"}}, order_by: {level_order: asc}) {
          ${navigationFields}

          childrenList: navigations (order_by: {level_order: asc}) {
            ${navigationFields}

            childrenList: navigations (order_by: {level_order: asc}) {
              ${navigationFields}
            }
          }
        }

        categoryList: categories (
          where: {navigations_categories: {navigation_uid: {_eq: "${navigationUid}"}}}
        ) {
          uid
          name
        }

        filterOptions: filter_options (
          where: { navigations_filter_options: {navigation_uid: {_eq: "${navigationUid}"}} }
        ) {
          uid
          name
          level
          parentUid: parent_uid
        }
      }
    `,
  });

  // [path] was wrong, trying to correct it
  if (`${path}/${navigationUid}` !== data.navigation?.urlPath) {
    return {
      redirect: {
        destination: "/products/" + data.navigation?.urlPath,
        permanent: true,
      },
    };
  }

  const filterOptions = (data.filterOptions || [])
    .filter((item) => item.level === "filter")
    .map((filter) => {
      const options = (data.filterOptions || []).filter(
        (item) => item.level === "option" && item.parentUid === filter.uid
      );
      return { ...filter, options };
    });

  return {
    props: {
      filterIds: data.navigation?.filterIds || [],
      navigation: data.navigation || {},
      navigationList: data.navigationList || [],
      categoryList: data.categoryList || [],
      filterOptions,
    },
  };
};

export default Home;

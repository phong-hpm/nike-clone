import { useEffect, useRef, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useQuery, gql } from "@apollo/client";

import { apolloClient } from "../../_app";

// components
import MainLayout from "../../../components/layouts/MainLayout";
import Breadcrumbs from "../../../components/main/Breadcrumbs";
import ProductHeader from "../../../components/main/ProductHeader";
import ProductCard from "../../../components/main/ProductCard";

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

const Home: NextPage<{ navigations: INavigation[]; filterIds: string[] }> = ({
  navigations,
  filterIds,
}) => {
  const { data, loading, fetchMore, refetch } = useQuery<{ products?: IProduct[] }>(productQuery, {
    variables: { whereAnd: filterIds.map((id) => ({ filters: { _regex: id } })) },
  });

  const stateRef = useRef({ offset: 0, fetching: true });
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  const [navigating, setNavigating] = useState(true);

  useEffect(() => {
    refetch().then(() => setNavigating(false));
  }, [refetch, filterIds]);

  useEffect(() => {
    stateRef.current.fetching = loading;
    stateRef.current.offset = data?.products?.length || 0;
  }, [loading, data?.products]);

  useEffect(() => {
    if (loading || !spinnerRef.current) return;
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
      { rootMargin: "200px" }
    );

    observer.observe(snipperEl);
    return () => observer.unobserve(snipperEl);
  }, [loading, fetchMore]);

  return (
    <MainLayout navigations={navigations} onNavigation={() => setNavigating(true)}>
      <Breadcrumbs />
      <ProductHeader filterIds={filterIds} navigating={navigating} />

      <div className="grow-1 flex py-[16px]">
        {/* Filters */}
        <div className="page-spacing !pr-0 shrink-0 basis-[260px] bg-blue-100">Filters</div>

        <div className="page-spacing grow-1 shrink-1 w-full">
          {/* Product List */}
          <div className="grid grid-cols-3 gap-4">
            {(data?.products || []).map((product) => (
              <ProductCard key={product.uid} loading={navigating} product={product} />
            ))}
          </div>

          {/* loadmore */}
          <div ref={spinnerRef} className="flex justify-center py-10">
            <div className="spinner" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { navigationUid } = req.query;

  const { data } = await apolloClient.query({
    query: gql`
      query {
        navigations_by_pk(uid: "${navigationUid}") {
          filterIds: filter_ids
        }

        navigations {
          uid
          parentUid: parent_uid
          path
          label
          level
          levelOrder: level_order
          urlPath: url_path
          filterIds: filter_ids
        }
      }
    `,
  });

  return {
    props: {
      filterIds: data.navigations_by_pk?.filterIds || [],
      navigations: data.navigations || [],
    },
  };
};

export default Home;

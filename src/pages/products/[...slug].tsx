import { GetServerSideProps, NextPage } from "next";

// utils
import { apolloClient } from "@root/utils";

// components
import { MainLayout } from "@root/components/layouts";
import { Breadcrumbs, ProductHeader } from "@root/components/features";

// modules
import Filters from "@root/modules/products/Filters";
import ProductList from "@root/modules/products/ProductList";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";

export interface HomeProps {
  filterIdList: string[];
  navigation: INavigation;
  navigationList: INavigation[];
  categoryList: ICategory[];
  filterOptionList: IFilterOption[];
  productCount: number;
  productList: IProduct[];
}

const Home: NextPage<HomeProps> = ({
  navigationList,
  filterIdList,
  navigation,
  categoryList,
  filterOptionList,
  productCount,
  productList,
}) => {
  return (
    <MainLayout navigationList={navigationList}>
      <Breadcrumbs navigation={navigation} />
      <ProductHeader title={navigation.title || ""} productCount={productCount} />

      <div className="grow-1 flex">
        {/* Filters */}
        <div className="shrink-0 basis-[260px]">
          <Filters
            filterIdList={filterIdList}
            categoryList={categoryList || []}
            filterOptionList={filterOptionList}
          />
        </div>

        <div className="page-spacing grow-1 shrink-1 w-full py-4">
          <ProductList
            productCount={productCount}
            filterIdList={filterIdList}
            initialProductList={productList}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const [path, navigationUid] = (req.query?.slug || []) as string[];

  const getNavigation = async () => {
    const { data } = await apolloClient.query<{ navigation: INavigation }>({
      query: graphqlQueries.NAVIGATION_DEEP,
      variables: { uid: navigationUid },
    });
    return data.navigation || {};
  };
  const getNavigationList = async () => {
    const { data } = await apolloClient.query<{ navigationList: INavigation[] }>({
      query: graphqlQueries.NAVIGATION_LIST_DEEP,
    });
    return data.navigationList || [];
  };
  const getCategoryList = async () => {
    const { data } = await apolloClient.query<{ categoryList: ICategory[] }>({
      query: graphqlQueries.CATEGORY_LIST,
      variables: { navigationUid },
    });
    return data.categoryList || [];
  };
  const getFilterOptionList = async () => {
    const { data } = await apolloClient.query<{ filterOptionList: IFilterOption[] }>({
      query: graphqlQueries.FILTER_OPTION_LIST,
      variables: { navigationUid },
    });
    return data.filterOptionList || [];
  };

  const [navigation, navigationList, categoryList, filterOptionList] = await Promise.all([
    getNavigation(),
    getNavigationList(),
    getCategoryList(),
    getFilterOptionList(),
  ]);
  const filterIdList = navigation.filterIdList || [];

  const getProductAggregate = async () => {
    const { data } = await apolloClient.query<{ productsAggregate: { aggregate: IAggregate } }>({
      query: graphqlQueries.PRODUCT_AGGREGATE,
      variables: { whereAnd: filterIdList.map((id) => ({ filters: { _regex: id } })) },
    });
    return data.productsAggregate.aggregate || [];
  };
  const getProductList = async () => {
    const { data } = await apolloClient.query<{ productList: IProduct[] }>({
      query: graphqlQueries.PRODUCT_LIST,
      variables: { whereAnd: filterIdList.map((id) => ({ filters: { _regex: id } })) },
    });
    return data.productList || [];
  };

  const [productAggregate, productList] = await Promise.all([
    getProductAggregate(),
    getProductList(),
  ]);
  const productCount = productAggregate.count;

  // [path] was wrong, trying to correct it
  if (`${path}/${navigationUid}` !== navigation?.urlPath) {
    return {
      redirect: {
        destination: "/products/" + navigation?.urlPath,
        permanent: true,
      },
    };
  }

  const mappedFilterOptionList = filterOptionList
    .filter((item) => item.level === "filter")
    .map((filter) => {
      const options = filterOptionList.filter(
        (item) => item.level === "option" && item.parentUid === filter.uid
      );
      return { ...filter, options };
    });

  return {
    props: {
      filterIdList,
      navigation,
      navigationList,
      categoryList,
      filterOptionList: mappedFilterOptionList,
      productCount,
      productList,
    },
  };
};

export default Home;

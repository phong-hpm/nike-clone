import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";

// utils
import { apolloClient, mapPageUrl } from "@root/utils";

// components
import { MainLayout } from "@root/components/layouts";

// modules
import Filters from "@root/modules/products/Filters";
import ProductBreadcrumbs from "@root/modules/products/ProductBreadcrumbs";
import ProductHeader from "@root/modules/products/ProductHeader";
import ProductList from "@root/modules/products/ProductList";
import ProductsProvider from "@root/modules/products/ProductsContext";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

export interface ProductsProps {
  filterIdList: string[];
  navigation: INavigation;
  navigationList: INavigation[];
  categoryList: ICategory[];
  filterOptionList: IFilterOption[];
  productCount: number;
}

const Products: NextPage<ProductsProps> = ({
  navigationList,
  filterIdList: filterIdListProp,
  navigation,
  categoryList,
  filterOptionList,
}) => {
  const [isShowFilterBar, setShowFilterBar] = useState(false);
  const [isShowFilterModal, setShowFilterModal] = useState(false);
  const [filterIdList, setFilterIdList] = useState<string[]>(filterIdListProp);

  const isScreenLG = useMediaScreen("lg");

  // [handleNavigate] will be fired immediately after user click [NavigationLink]
  const handleNavigate = (navigation: INavigation) => {
    // Because in the same path [/products], nextjs will not re-mount all component
    // By managing [filterIdList] right here, we can update [filterIdList] immediately without waiting for [getServerSideProps]

    // After load page, when user click [NavigationLink]
    // - while nextjs is waiting for [getServerSideProps], we update [filterIdList],
    //     [ProductList] will update data when [filterIdList] was changed
    setFilterIdList(navigation.filterIdList);
  };

  // When the screen was changed to be greater or equal than "LG", auto "Show" [Filter]
  // When the screen was changed to be less than "LG", auto "Hide" [Filter]
  useEffect(() => {
    setShowFilterBar(isScreenLG);
    // "Hide" Modal when the screen was changed to be greater or equal than "LG"
    if (isScreenLG) setShowFilterModal(false);
  }, [isScreenLG]);

  return (
    <MainLayout
      title={navigation.title}
      navigationList={navigationList}
      onNavigate={handleNavigate}
    >
      <ProductsProvider
        filterIdList={filterIdList}
        navigation={navigation}
        categoryList={categoryList}
        filterOptionList={filterOptionList}
      >
        <div className="mb-3 lg:mb-[-4px]">
          <ProductBreadcrumbs />
        </div>

        <div className="mb-2 lg:mb-5">
          <ProductHeader
            onClickFilter={() =>
              isScreenLG
                ? setShowFilterBar(!isShowFilterBar)
                : setShowFilterModal(!isShowFilterModal)
            }
          />
        </div>

        <div className="grow-1 flex flex-col lg:flex-row">
          {/* Filters */}
          <Filters
            isShowBar={isShowFilterBar}
            isShowModal={isShowFilterModal}
            onHide={() => setShowFilterModal(false)}
          />

          <div className="page-spacing grow-1 shrink-1 w-full">
            <ProductList />
          </div>
        </div>
      </ProductsProvider>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { slug = [] } = req.query;
  const [path, navigationUid, filterString = ""] = slug as string[];
  const filterIdList: string[] = filterString.split(",");

  const [navigation, navigationList, categoryList, filterOptionList] = await Promise.all([
    api.getNavigation(navigationUid),
    api.getNavigationList(),
    api.getCategoryList(navigationUid),
    api.getFilterOptionList(navigationUid),
  ]);

  // [path] was wrong, trying to correct it
  if (path !== navigation?.urlPath) {
    return {
      redirect: {
        destination: mapPageUrl.mapProducts(navigation, filterString),
        permanent: true,
      },
    };
  }

  return {
    props: { filterIdList, navigation, navigationList, categoryList, filterOptionList },
  };
};

const api = {
  getNavigation: async (uid: string) => {
    const { data } = await apolloClient.query<{ navigation: INavigation }>({
      query: graphqlQueries.NAVIGATION_DEEP,
      variables: { uid },
    });
    return data.navigation || {};
  },
  getNavigationList: async () => {
    const { data } = await apolloClient.query<{ navigationList: INavigation[] }>({
      query: graphqlQueries.NAVIGATION_LIST_DEEP,
    });
    return data.navigationList || [];
  },
  getCategoryList: async (navigationUid: string) => {
    const { data } = await apolloClient.query<{ categoryList: ICategory[] }>({
      query: graphqlQueries.CATEGORY_LIST,
      variables: { navigationUid },
    });
    return data.categoryList || [];
  },
  getFilterOptionList: async (navigationUid: string) => {
    const { data } = await apolloClient.query<{ filterOptionList: IFilterOption[] }>({
      query: graphqlQueries.FILTER_OPTION_LIST,
      variables: { navigationUid },
    });
    return data.filterOptionList || [];
  },
};

export default Products;

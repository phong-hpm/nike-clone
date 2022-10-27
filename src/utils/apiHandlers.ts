import { apolloClient } from "./apolloClient";
import graphqlQueries from "@root/graphqlQueries";

export const apiHandlers = {
  getLayout: async (uid: string) => {
    const { data } = await apolloClient.query<{ layout: { home: ILayout[] } }>({
      query: graphqlQueries.LAYOUT,
      variables: { uid },
    });
    return data.layout || { gridList: [] };
  },
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
  getProductDetail: async (productUid: string) => {
    const { data } = await apolloClient.query<{ productDetail: INavigation[] }>({
      query: graphqlQueries.PRODUCT_DETAIL,
      variables: { productUid: productUid },
    });
    return data.productDetail || [];
  },
};

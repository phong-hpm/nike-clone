import { apolloClient } from "./apolloClient";
import graphqlQueries from "@root/graphqlQueries";
import axios from "axios";

export const apiHandlers = {
  getLayout: async (pageUrlPath: string) => {
    const { data } = await apolloClient.query<{
      layouts: ILayout[];
      layoutItemList: ILayoutItem[];
    }>({
      query: graphqlQueries.LAYOUT,
      variables: { pageUrlPath },
    });
    return { layout: data.layouts?.[0] || {}, layoutItemList: data.layoutItemList || [] };
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
  getRetails: async () => {
    const { data } = await apolloClient.query<{ retailList: IRetail[] }>({
      query: graphqlQueries.RETAILS,
    });
    return data || { retails: [] };
  },
  searchAddress: async (q: string) => {
    const { data } = await axios.get<{ error: boolean; data: IOpenStreetData[] }>(
      "api/retails/search-address",
      { params: { q } }
    );
    return data;
  },
};

export const mapPageUrl = {
  mapLayout: (navigation: INavigation) => {
    return `/${navigation.hrefPath}`;
  },
  mapProducts: (navigation: INavigation, filterIdList?: string | string[]) => {
    let filterIdString = navigation.filterIdList.join("");

    if (filterIdList) {
      if (typeof filterIdList === "string") filterIdString = filterIdList;
      else filterIdString = filterIdList.join("");
    }

    return `/p/${navigation?.urlPath}/${navigation.uid}/${filterIdString}`;
  },
  mapProductDetail: (styleColor: string) => `/d/${styleColor}`,
};

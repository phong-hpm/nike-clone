export const mapPageUrl = {
  mapProducts: (navigation: INavigation, filterIdList?: string | string[]) => {
    let filterIdString = navigation.filterIdList.join(",");

    if (filterIdList) {
      if (typeof filterIdList === "string") filterIdString = filterIdList;
      else filterIdString = filterIdList.join(",");
    }

    return "/products/" + `${navigation?.urlPath}/${navigation.uid}/${filterIdString}`;
  },
};

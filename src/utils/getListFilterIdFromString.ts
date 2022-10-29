export const getListFilterIdFromString = (filterIdStr: string) => {
  const list: string[] = filterIdStr.match(/.{1,10}/g) || [];
  if (list.find((id) => id.length !== 10)) {
    console.warn("Filter Id string is invalid");
  }
  return list;
};

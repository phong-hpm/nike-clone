export const getLastPath = (str: string, splitter = "/") => {
  const paths = str.split(splitter);
  return paths[paths.length - 1];
};

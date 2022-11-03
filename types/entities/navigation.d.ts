declare interface INavigation {
  uid: string;
  parentUid?: string;
  path: string;
  urlPath: string;
  hrefPath: string;
  label: string;
  title: string;
  level: "root" | "group" | "link";
  levelOrder: number;
  filterIdList: string[];
  parent?: INavigation;
  childrenList?: INavigation[];
}

declare interface IAggregate {
  aggregate: { count: number };
}

declare interface IProduct {
  uid: string;
  title: string;
  subTitle: string;
  label: string;
  price: {
    currency: string;
    currentPrice: number;
    discounted: number;
    fullPrice: number;
  };
  images: {
    portraitURL: string;
    squarishURL: string;
  };
  productAnotherColors: IProduct[];
  inStock: boolean;
  bestSeller: boolean;
  comingSoon: boolean;
}

declare interface INavigation {
  uid: string;
  parentUid?: string;
  path: string;
  urlPath: string;
  label: string;
  title: string;
  level: "root" | "group" | "link";
  levelOrder: number;
  filterIdList: string[];
  parent?: INavigation;
  childrenList?: INavigation[];
}

declare interface ICategory {
  uid: string;
  name: string;
}

declare interface IFilterOption {
  uid: string;
  name: string;
  level: "filter" | "option";
  parentUid?: string;
  options?: IFilterOption[];
}

declare interface IAggregate {
  count: number;
}

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
  level: "root" | "group" | "link";
  levelOrder: number;
}

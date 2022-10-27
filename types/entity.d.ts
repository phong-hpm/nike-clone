declare interface IAggregate {
  aggregate: { count: number };
}

declare interface IHome {
  pageData: {
    layout: string;
    openGraph: {
      title: string;
    };
  };
  layout: Record<string, ILayout>;
  layoutItems: Record<string, ILayoutItem>;
  cards: Record<string, ILayoutCard>;
}
declare interface IProduct {
  uid: string;
  title: string;
  subTitle: string;
  label?: string;
  price: {
    currency: string;
    currentPrice: number;
    fullPrice: number;
    discounted: boolean;
  };
  images: {
    portraitURL: string;
    squarishURL: string;
  };
  productAnotherColors?: IProduct[];
  inStock?: boolean;
  bestSeller?: boolean;
  comingSoon?: boolean;
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

declare interface IProductDetailNode {
  id: string;
  subType: "image" | "video";
  properties: {
    title: string;
    body: string;
    portraitURL?: string;
    landscapeURL?: string;
    squarishURL?: string;
    videoURL?: string;
  };
  nodes?: IProductDetailNode[];
}

declare interface IProductDetailSKUS {
  skuId: string;
  localizedSize: string;
  localizedSizePrefix: string;
  nikeSize: string;
}

declare interface IProductDetail {
  uid: string;
  products: Record<
    string,
    {
      title: string;
      subTitle: string;
      fullTitle: string;
      fullPrice: number;
      currentPrice: number;
      discounted: boolean;
      currency: string;
      styleColor: string;
      descriptionPreview: string;
      colorDescription: string;
      firstImageUrl: string;
      description: string;
      availableSkus: IProductDetailSKUS[];
      skus: IProductDetailSKUS[];
      nodes: IProductDetailNode[];
    }
  >;
  relatedProducts: IProduct[];
}

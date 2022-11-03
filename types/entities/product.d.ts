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

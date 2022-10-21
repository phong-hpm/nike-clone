import { PRODUCT_LIMIT } from "./product";

export const skeletonData = {
  productList: Array(PRODUCT_LIMIT)
    .fill("")
    .map((_, i) => ({
      uid: String(i),
      title: "",
      subTitle: "",
      label: "",
      bestSeller: false,
      comingSoon: false,
      inStock: true,
      images: { portraitURL: "", squarishURL: "" },
      price: { currency: "", currentPrice: 0, discounted: false, fullPrice: 0 },
      productAnotherColors: [],
    })) as IProduct[],
};

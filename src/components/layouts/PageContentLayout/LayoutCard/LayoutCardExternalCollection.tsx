import { FC, useMemo } from "react";

// components
import { ProductCardSlider } from "@root/components/features";

export interface LayoutCardExternalCollectionProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardExternalCollection: FC<LayoutCardExternalCollectionProps> = ({
  layoutCardDetail,
}) => {
  const productList = useMemo(() => {
    return (layoutCardDetail.slides as ILayoutCardDetailSlide[]).map((slide) => ({
      uid: slide.productId,
      title: slide.title,
      subTitle: slide.subtitle,
      images: { portraitURL: slide.imgUrl, squarishURL: slide.imgUrl },
      price: {
        currency: slide.currency,
        discounted: slide.isOnSale,
        fullPrice: slide.listPrice,
        currentPrice: slide.salePrice,
      },
    }));
  }, [layoutCardDetail.slides]);

  return (
    <ProductCardSlider title={layoutCardDetail.sectionHeadline?.title} productList={productList} />
  );
};

export default LayoutCardExternalCollection;

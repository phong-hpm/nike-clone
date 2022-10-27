import { FC, useMemo, useState } from "react";

// components
import { ProductCardSlider } from "@root/components/features";

export interface LayoutCardSNKRSDropsProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardSNKRSDrops: FC<LayoutCardSNKRSDropsProps> = ({ layoutCardDetail }) => {
  const [isUpComing, setUpComing] = useState(false);

  const productList = useMemo(() => {
    const slides = isUpComing ? layoutCardDetail.slidesUpcoming : layoutCardDetail.slides;

    return (slides as ILayoutCardDetailSlide[]).map((slide) => ({
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
  }, [isUpComing, layoutCardDetail.slides, layoutCardDetail.slidesUpcoming]);

  return (
    <ProductCardSlider
      title={layoutCardDetail.sectionHeadline?.title}
      switchOptions={[
        { value: "instock", label: "In Stock" },
        { value: "upcoming", label: "Up Coming" },
      ]}
      onSwitch={(option) => setUpComing(option.value === "upcoming")}
      productList={productList}
    />
  );
};

export default LayoutCardSNKRSDrops;

import { useContext } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// components
import { ButtonIcon, IconSvg } from "@root/components/commons";
import { ProductCard } from "@root/components/features";

// modules
import { ProductDetailContext } from "./ProductDetailProvider";

// custom hooks
import { useNavigation } from "@root/hooks";

const RelatedProducts = () => {
  const { relatedProducts } = useContext(ProductDetailContext);

  const { navigate } = useNavigation();

  return (
    <>
      <div className="flex mb-3 items-center justify-between page-spacing">
        <h3 className="grow text-lg font-medium">You Might Also Like</h3>

        <div className="shrink-0 basis-32 flex justify-end">
          <ButtonIcon id="swiper-prev" className="bg-neutral-200 disabled:opacity-25 p-3">
            <IconSvg icon="arrow" className="arrow-left" />
          </ButtonIcon>
          <ButtonIcon id="swiper-next" className="bg-neutral-200 disabled:opacity-25 p-3 ml-3">
            <IconSvg icon="arrow" className="arrow-right" />
          </ButtonIcon>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1.4}
        spaceBetween={12}
        breakpoints={{ 640: { slidesPerView: 3.1 } }}
        style={{ padding: "0 50px" }}
        navigation={{ prevEl: "#swiper-prev", nextEl: "#swiper-next" }}
      >
        {relatedProducts.map((product) => {
          return (
            <SwiperSlide key={product.uid}>
              <ProductCard
                isFlexibleHeight
                hasColour={false}
                product={product}
                imageClass="rounded"
                onClick={() => navigate("/product-detail/CU4495-010", { shallow: true })}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default RelatedProducts;

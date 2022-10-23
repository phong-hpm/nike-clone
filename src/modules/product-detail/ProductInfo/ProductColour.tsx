import { useContext } from "react";

// components
import { ImageCustom } from "@root/components/commons";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";

const ProductColour = () => {
  const { selectedProduct, onChangeColorId, products } = useContext(ProductDetailContext);

  if (!selectedProduct) return <></>;

  return (
    <>
      <div
        className={cls(
          "flex overflow-x-auto hide-scroll-bar h-32",
          "lg:grid lg:grid-cols-5 lg:gap-1"
        )}
      >
        {Object.values(products).map((product) => {
          const isSelected = product.styleColor === selectedProduct.styleColor;

          return (
            <div
              key={product.styleColor}
              className={cls(
                "bg-[#F7F7F7] rounded border border-[#F7F7F7]",
                "overflow-hidden shrink-0 w-32 cursor-pointer mr-1 lg:mr-2 lg:w-auto",
                isSelected && "!border-black"
              )}
              onClick={() => onChangeColorId(product.styleColor)}
            >
              <ImageCustom className="rounded" sizes="10vw" ratio={1} src={product.firstImageUrl} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductColour;

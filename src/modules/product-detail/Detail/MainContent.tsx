import { useContext } from "react";

// components
import ProductPrice from "@root/components/features/ProductCard/ProductPrice";
import { ImageCustom } from "@root/components/commons";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";

const MainContent = () => {
  const { selectedProduct, onChangeColorId, products } = useContext(ProductDetailContext);

  if (!selectedProduct) return <></>;

  return (
    <>
      <div className="mb-4">
        <h1 className="font-medium text-3xl">{selectedProduct.title}</h1>
        <h1 className="font-medium mb-4">{selectedProduct.subTitle}</h1>
        <ProductPrice isDiscountInline price={selectedProduct} />
      </div>

      <div className="grid grid-cols-5 gap-1">
        {Object.values(products).map((product) => {
          const isSelected = product.styleColor === selectedProduct.styleColor;

          return (
            <div
              key={product.styleColor}
              className={mapClasses(
                "cursor-pointer mr-2 bg-[#F7F7F7] rounded border border-[#F7F7F7] overflow-hidden",
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

export default MainContent;

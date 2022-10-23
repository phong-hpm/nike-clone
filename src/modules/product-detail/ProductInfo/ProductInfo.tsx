import { useContext } from "react";

// components
import ProductPrice from "@root/components/features/ProductCard/ProductPrice";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";

const ProductInfo = () => {
  const { selectedProduct } = useContext(ProductDetailContext);

  if (!selectedProduct) return <></>;

  return (
    <>
      <h1 className="font-medium text-3xl">{selectedProduct.title}</h1>
      <h1 className="font-medium mb-4">{selectedProduct.subTitle}</h1>
      <ProductPrice isDiscountInline price={selectedProduct} />
    </>
  );
};

export default ProductInfo;

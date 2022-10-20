import { createContext, FC, ReactNode, useMemo } from "react";

interface IProductDetailContextTypes {
  bannerNodeList: IProductDetailNode[];
  detailNodeList: IProductDetailNode[];
  products: IProductDetail["products"];
  selectedProduct?: IProductDetail["products"][0];
  onChangeColorId: (colorId: string) => void;
  relatedProducts: IProduct[];
}

export const ProductDetailContext = createContext<IProductDetailContextTypes>({
  bannerNodeList: [],
  detailNodeList: [],
  products: {},
  onChangeColorId: () => {},
  relatedProducts: [],
});

export interface ProductDetailProviderProps {
  onChangeColorId: (colorId: string) => void;
  selectedProduct: IProductDetail["products"][0];
  productDetail: IProductDetail;
  children: ReactNode;
}

const ProductDetailProvider: FC<ProductDetailProviderProps> = ({
  onChangeColorId,
  selectedProduct,
  productDetail,
  children,
}) => {
  const values = useMemo(
    () => ({
      bannerNodeList: selectedProduct.nodes[0]?.nodes || [],
      detailNodeList: selectedProduct.nodes,
      selectedProduct,
      onChangeColorId,
      products: productDetail.products,
      relatedProducts: productDetail.relatedProducts,
    }),
    [productDetail, selectedProduct, onChangeColorId]
  );

  return <ProductDetailContext.Provider value={values}>{children}</ProductDetailContext.Provider>;
};

export default ProductDetailProvider;

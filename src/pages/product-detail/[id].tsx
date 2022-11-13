import { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

// components
import { MainLayout } from "@root/components/layouts";

// modules
import ProductInfo from "@root/modules/product-detail/ProductInfo";
import ProductMoreInfo from "@root/modules/product-detail/ProductMoreInfo";
import RelatedProducts from "@root/modules/product-detail/RelatedProducts";
import ProductDetailProvider from "@root/modules/product-detail/ProductDetailProvider";

// custom hooks
import { useNavigation } from "@root/hooks";

// utils
import { apiHandlers, mapPageUrl } from "@root/utils";

export interface ProductDetailProps {
  navigationList: INavigation[];
  productDetail: IProductDetail;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ navigationList, productDetail }) => {
  console.log(productDetail)
  const router = useRouter();
  const { replace } = useNavigation();

  const selectedProduct = useMemo(
    () => productDetail.products['CU4495-010'],
    // () => productDetail.products[router.query.id as string],
    [productDetail.products]
  );

  const handleChangeColorId = (styleColor: string) => {
    replace(mapPageUrl.mapProductDetail(styleColor), { shallow: true });
  };

  return (
    <ProductDetailProvider
      selectedProduct={selectedProduct}
      productDetail={productDetail}
      onChangeColorId={handleChangeColorId}
    >
      <MainLayout title={selectedProduct.fullTitle} navigationList={navigationList}>
        <div className="page-spacing py-8">
          <ProductInfo />
          <ProductMoreInfo />
        </div>

        <div className="mb-10">
          <RelatedProducts />
        </div>
      </MainLayout>
    </ProductDetailProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const [navigationList, productDetail] = await Promise.all([
    apiHandlers.getNavigationList(),
    apiHandlers.getProductDetail("0Uk3E9DBrx"),
  ]);

  return { props: { navigationList, productDetail } };
};

export default ProductDetail;

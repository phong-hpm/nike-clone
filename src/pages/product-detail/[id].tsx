import { useMemo, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

// utils
import { apolloClient } from "@root/utils";

// components
import { MainLayout } from "@root/components/layouts";

// modules
import ProductInfo from "@root/modules/product-detail/ProductInfo";
import ProductMoreInfo from "@root/modules/product-detail/ProductMoreInfo";
import RelatedProducts from "@root/modules/product-detail/RelatedProducts";
import ProductDetailProvider from "@root/modules/product-detail/ProductDetailProvider";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";
import { useNavigation } from "@root/hooks";

export interface ProductDetailProps {
  navigationList: INavigation[];
  productDetail: IProductDetail;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ navigationList, productDetail }) => {
  const router = useRouter();
  const { replace } = useNavigation();

  const selectedProduct = useMemo(
    () => productDetail.products[router.query.id as string],
    [productDetail.products, router.query.id]
  );

  const handleChangeColorId = (styleColor: string) => {
    replace(`/product-detail/${styleColor}`, { shallow: true });
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

        <RelatedProducts />
      </MainLayout>
    </ProductDetailProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const getNavigationList = async () => {
    const { data } = await apolloClient.query<{ navigationList: INavigation[] }>({
      query: graphqlQueries.NAVIGATION_LIST_DEEP,
    });
    return data.navigationList || [];
  };
  const getProductDetail = async () => {
    const { data } = await apolloClient.query<{ productDetail: INavigation[] }>({
      query: graphqlQueries.PRODUCT_DETAIL,
      variables: { productUid: "0Uk3E9DBrx" },
    });
    return data.productDetail || [];
  };

  const [navigationList, productDetail] = await Promise.all([
    getNavigationList(),
    getProductDetail(),
  ]);

  return {
    props: {
      navigationList,
      productDetail,
    },
  };
};

export default ProductDetail;

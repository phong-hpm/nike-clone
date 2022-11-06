import { useContext, useState } from "react";

// components
import ProductPrice from "@root/components/features/ProductCard/ProductPrice";
import { Modal, ModalBody, ModalHeader } from "@root/components/commons";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import ProductColour from "./ProductColour";
import ProductActions from "./ProductActions";
import ProductDescription from "./ProductDescription";

const ProductDetail = () => {
  const { selectedProduct } = useContext(ProductDetailContext);

  const [isShowModal, setShowModal] = useState(false);

  if (!selectedProduct) return <></>;

  return (
    <div className="flex flex-col lg:flex-row mb-20 lg:max-w-7.5xl mx-auto">
      <div className="block lg:hidden mb-8">
        <ProductInfo />
      </div>

      <div className="mb-4 lg:mb-0">
        <ProductImage />
      </div>

      <div className="shrink-0 lg:basis-94">
        <div className="hidden lg:block mb-4">
          <ProductInfo />
        </div>

        <div className="mb-8">
          <ProductColour />
        </div>

        <div className="mb-12">
          <ProductActions />
        </div>

        <ProductDescription onClickViewDetail={() => setShowModal(true)} />

        <Modal isShow={isShowModal} animation="slide-up" onHide={() => setShowModal(false)}>
          <ModalHeader>
            <div className="flex items-center">
              <img className="w-16" src={selectedProduct.firstImageUrl} alt="" />

              <div className="flex flex-col ml-4">
                <h1>{selectedProduct.title}</h1>
                <ProductPrice hideDiscount price={selectedProduct} />
              </div>
            </div>
          </ModalHeader>

          <ModalBody className="py-8">
            <div dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default ProductDetail;

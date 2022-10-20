import { useContext, useState } from "react";

// components
import ProductPrice from "@root/components/features/ProductCard/ProductPrice";
import { Modal, ModalBody, ModalHeader } from "@root/components/commons";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";
import Actions from "./Actions";
import MainContent from "./MainContent";
import SubContents from "./Subcontent";

const Detail = () => {
  const { selectedProduct } = useContext(ProductDetailContext);

  const [isShowModal, setShowModal] = useState(false);

  if (!selectedProduct) return <></>;

  return (
    <>
      <div className="mb-8">
        <MainContent />
      </div>

      <div className="mb-12">
        <Actions />
      </div>

      <SubContents onClickViewDetail={() => setShowModal(true)} />

      <Modal isShow={isShowModal} className="relative !py-0" onHide={() => setShowModal(false)}>
        <ModalHeader onHide={() => setShowModal(false)}>
          <div className="flex items-end">
            <img className="w-16" src={selectedProduct.firstImageUrl} alt="" />

            <div className="flex flex-col ml-4">
              <h1 className="mb-2">{selectedProduct.title}</h1>
              <ProductPrice hideDiscount price={selectedProduct} />
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          <div
            className="pt-2"
            dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
          ></div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Detail;

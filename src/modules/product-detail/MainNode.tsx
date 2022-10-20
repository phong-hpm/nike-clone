import { useContext, useState } from "react";

// components
import { ImageCustom, Modal, ModalBody, ModalHeader } from "@root/components/commons";

// modules
import { ProductDetailContext } from "./ProductDetailProvider";

const MainNode = () => {
  const { bannerNodeList } = useContext(ProductDetailContext);

  const [isShowModal, setShowModal] = useState(false);

  return (
    <div
      className="grow grid grid-cols-2 gap-3 mr-20 cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      {bannerNodeList.map((node) => {
        if (node.subType === "image")
          return (
            <ImageCustom
              key={node.id}
              className="w-full"
              ratio={4 / 5}
              sizes="33vw"
              src={node.properties.portraitURL}
            />
          );

        return (
          <div key={node.id} className="bg-neutral-1000">
            <video
              key={node.id}
              className="h-full w-auto"
              autoPlay
              loop
              src={node.properties.videoURL}
            ></video>
          </div>
        );
      })}

      <Modal className="relative !p-0" isFull isShow={isShowModal}>
        <ModalHeader onHide={() => setShowModal(false)} />

        <ModalBody className="!p-0">
          {bannerNodeList.map((node) => {
            return (
              <div key={node.id} className="bg-neutral-100">
                {node.subType === "video" ? (
                  <video key={node.id} autoPlay loop src={node.properties.videoURL}></video>
                ) : (
                  <ImageCustom
                    key={node.id}
                    className="w-full"
                    src={node.properties.portraitURL}
                    ratio={4 / 5}
                  />
                )}
              </div>
            );
          })}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MainNode;

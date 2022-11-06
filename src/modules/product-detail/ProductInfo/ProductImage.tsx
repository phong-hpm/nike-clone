import { useContext, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// components
import {
  ButtonIcon,
  IconSvg,
  ImageCustom,
  Modal,
  ModalBody,
  ModalHeader,
} from "@root/components/commons";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";
import useMediaScreen from "@root/hooks/useMediaScreen";

const ProductImageNode = () => {
  const { bannerNodeList } = useContext(ProductDetailContext);

  const isScreenLG = useMediaScreen("lg");

  const [isShowModal, setShowModal] = useState(false);

  if (!isScreenLG)
    return (
      <div className="out-page-spacing relative">
        <div
          className={cls(
            "shrink-0 basis-32 flex justify-between",
            "absolute z-100 top-1/2 px-10 w-full translate-y-[-50%]"
          )}
        >
          <ButtonIcon
            id="swiper-prev"
            className="bg-neutral-200 opacity-50 disabled:opacity-25 p-2"
          >
            <IconSvg icon="arrow" className="arrow-left" />
          </ButtonIcon>
          <ButtonIcon
            id="swiper-next"
            className="bg-neutral-200 opacity-50 disabled:opacity-25 p-2 ml-3"
          >
            <IconSvg icon="arrow" className="arrow-right" />
          </ButtonIcon>
        </div>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={12}
          navigation={{ prevEl: "#swiper-prev", nextEl: "#swiper-next" }}
        >
          {bannerNodeList
            .filter(({ subType }) => subType === "image")
            .map((node) => {
              return (
                <SwiperSlide key={node.id}>
                  <ImageCustom className="w-full" ratio={4 / 5} src={node.properties.portraitURL} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    );

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

      <Modal isFull isShow={isShowModal} onHide={() => setShowModal(false)}>
        <ModalHeader />

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

export default ProductImageNode;

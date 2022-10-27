import { FC, useMemo } from "react";

// components
import { ImageCustom } from "@root/components/commons";
import LayoutCardDescriptionLayer from "./LayoutCardDescriptionLayer";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

export interface LayoutCardImageProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardImage: FC<LayoutCardImageProps> = ({ layoutCardDetail }) => {
  const { preferredOrientation, assetsIds, assetsAspectRatios } = layoutCardDetail;

  const isScreenLG = useMediaScreen("lg");
  const isScreenMD = useMediaScreen("md");

  const imageOrientation = useMemo(() => {
    if (isScreenLG) return preferredOrientation?.large;
    if (isScreenMD) return preferredOrientation?.medium;
    return preferredOrientation?.small;
  }, [isScreenLG, isScreenMD, preferredOrientation]);

  return (
    <>
      <ImageCustom
        src={layoutCardDetail.landscapeURL}
        imageId={assetsIds[imageOrientation]}
        ratio={assetsAspectRatios[imageOrientation]}
      />

      <LayoutCardDescriptionLayer layoutCardDetail={layoutCardDetail} />
    </>
  );
};

export default LayoutCardImage;

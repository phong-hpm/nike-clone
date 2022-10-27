import { FC } from "react";

// components
import LayoutCardDescriptionLayer from "./LayoutCardDescriptionLayer";

export interface LayoutCardVideoProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardVideo: FC<LayoutCardVideoProps> = ({ layoutCardDetail }) => {
  return (
    <>
      <div>
        <video
          src="/videos/hero.mp4"
          width="352"
          height="198"
          autoPlay={layoutCardDetail.autoPlay}
          loop={layoutCardDetail.loop}
        />
      </div>

      <LayoutCardDescriptionLayer layoutCardDetail={layoutCardDetail} />
    </>
  );
};

export default LayoutCardVideo;

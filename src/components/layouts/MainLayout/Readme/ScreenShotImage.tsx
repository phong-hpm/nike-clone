import { FC } from "react";

export interface ScreenShotImageProps {
  src: string;
}

const ScreenShotImage: FC<ScreenShotImageProps> = ({ src }) => {
  return (
    <div className="px-1">
      <img className="border shadow-md rounded-xl" src={`/images/documents/${src}`} alt="" />
    </div>
  );
};

export default ScreenShotImage;

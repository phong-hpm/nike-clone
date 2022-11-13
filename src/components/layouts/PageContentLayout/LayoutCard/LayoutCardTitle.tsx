import { FC } from "react";

export interface LayoutCardTitleProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardTitle: FC<LayoutCardTitleProps> = ({ layoutCardDetail }) => {
  const { bottomMargin, glyphSize } = layoutCardDetail;

  return (
    <div
      className={cls(
        "w-full flex flex-col items-center justify-center",
        bottomMargin === "xl" && "py-20"
      )}
    >
      <p className={cls("font-medium font-nike-futura", glyphSize === "extra_large" && "text-8xl")}>
        {layoutCardDetail.glyph}
      </p>
      <p className="text-xl font-medium">{layoutCardDetail.subTitle}</p>
    </div>
  );
};

export default LayoutCardTitle;

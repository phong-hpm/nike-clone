import { FC, useMemo } from "react";

// components
import LayoutItemBlock from "./LayoutItemBlock";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

const NEXT_PUBLIC_DEBUG_LAYOUT = process.env.NEXT_PUBLIC_DEBUG_LAYOUT;

export interface LayoutItemGridProps {
  layoutItem: ILayoutItem;
  className?: string;
}

const LayoutItemCol: FC<LayoutItemGridProps> = ({ layoutItem, className }) => {
  const isScreenLG = useMediaScreen("lg");
  const isScreenMD = useMediaScreen("md");

  const layoutItemDetail = useMemo(() => layoutItem.detail, [layoutItem]);

  const currentSpan = useMemo(() => {
    if (isScreenLG) return layoutItemDetail.span.large;
    if (isScreenMD) return layoutItemDetail.span.medium;
    return layoutItemDetail.span.small;
  }, [isScreenLG, isScreenMD, layoutItemDetail.span]);

  return (
    <>
      {NEXT_PUBLIC_DEBUG_LAYOUT === "1" && (
        // debug
        <h1>
          <p>layout: {layoutItem.uid}</p>
          {layoutItem.mode} {JSON.stringify(layoutItem.blockList?.map(({ uid }) => uid))}{" "}
          {JSON.stringify(layoutItemDetail.data)}
        </h1>
      )}
      <div
        className={className}
        style={{
          flexBasis: `${(currentSpan / 12) * 100}%`,
          maxWidth: `${(currentSpan / 12) * 100}%`,
        }}
      >
        {layoutItem.blockList?.map((block) => (
          <LayoutItemBlock key={block.uid} layoutItem={block} />
        ))}
      </div>
    </>
  );
};

export default LayoutItemCol;

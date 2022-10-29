import { FC, useMemo } from "react";

// components
import LayoutItem from "./LayoutItem";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

export interface LayoutItemColProps {
  layoutItem: ILayoutItem;
  className?: string;
}

const LayoutItemCol: FC<LayoutItemColProps> = ({ layoutItem, className }) => {
  const isScreenMD = useMediaScreen("md");
  const isScreenSM = useMediaScreen("sm");

  const layoutItemDetail = useMemo(() => layoutItem.detail, [layoutItem]);

  // [span.large]: from 'md'
  // [span.medium]: from 'sm' to 'md'
  // [span.small]: to 'sm'
  const currentSpan = useMemo(() => {
    if (isScreenMD) return layoutItemDetail.span.large;
    if (isScreenSM) return layoutItemDetail.span.medium;
    return layoutItemDetail.span.small;
  }, [isScreenSM, isScreenMD, layoutItemDetail.span]);

  const items = layoutItem.detail?.items || [];

  return (
    <div
      data-mode="col"
      className={cls(items.length > 1 && "my-[-6px]", className)}
      style={{
        flexBasis: `${(currentSpan / 12) * 100}%`,
        maxWidth: `${(currentSpan / 12) * 100}%`,
      }}
    >
      {items.map((layoutItemId) => (
        <LayoutItem
          key={layoutItemId}
          layoutItemId={layoutItemId}
          className={cls(items.length > 1 && "py-1.5")}
        />
      ))}
    </div>
  );
};

export default LayoutItemCol;

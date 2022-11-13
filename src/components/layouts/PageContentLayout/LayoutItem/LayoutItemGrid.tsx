import { CSSProperties, FC, useEffect, useMemo, useState } from "react";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

// components
import LayoutItemRow from "./LayoutItemRow";
import LayoutItem from "./LayoutItem";

export interface LayoutItemGridProps {
  layoutItem: ILayoutItem;
  className?: string;
}

const LayoutItemGrid: FC<LayoutItemGridProps> = ({ layoutItem, className }) => {
  const isScreenLG = useMediaScreen("lg");
  const isScreenMD = useMediaScreen("md");

  const [mounted, setMounted] = useState(false);

  const layoutItemDetail = useMemo(() => layoutItem.detail, [layoutItem]);

  const margin = useMemo(() => {
    const style: CSSProperties = {};
    const { top, bottom, left, right } = layoutItemDetail.attributes?.margin || {};
    style.marginTop = isScreenMD ? top?.desktop : top?.mobile;
    style.marginBottom = isScreenMD ? bottom?.desktop : bottom?.mobile;
    style.marginLeft = isScreenMD ? left?.desktop : left?.mobile;
    style.marginRight = isScreenMD ? right?.desktop : right?.mobile;
    return style;
  }, [isScreenMD, layoutItemDetail.attributes?.margin]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (isScreenLG) {
    if (!layoutItemDetail.display?.large) return <></>;
  } else if (isScreenMD) {
    if (!layoutItemDetail.display?.medium) return <></>;
  } else {
    if (!layoutItemDetail.display?.small) return <></>;
  }
  return (
    <div data-mode="grid" id={layoutItem.detail.id} className={className} style={{ ...margin }}>
      {layoutItem?.detail?.items?.map((layoutItemId) => (
        <LayoutItem key={layoutItemId} layoutItemId={layoutItemId} />
      ))}
    </div>
  );
};

export default LayoutItemGrid;

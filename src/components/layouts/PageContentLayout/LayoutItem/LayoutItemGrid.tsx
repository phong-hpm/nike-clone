import { CSSProperties, FC, useMemo } from "react";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

// components
import LayoutItemRow from "./LayoutItemRow";

const NEXT_PUBLIC_DEBUG_LAYOUT = process.env.NEXT_PUBLIC_DEBUG_LAYOUT;

export interface LayoutItemGridProps {
  layoutItem: ILayoutItem;
}

const LayoutItemGrid: FC<LayoutItemGridProps> = ({ layoutItem }) => {
  const isScreenLG = useMediaScreen("lg");
  const isScreenMD = useMediaScreen("md");
  const isScreenSM = useMediaScreen("sm");

  const layoutItemDetail = useMemo(() => layoutItem.detail, [layoutItem]);

  const margin = useMemo(() => {
    const style: CSSProperties = {};
    const { top, bottom, left, right } = layoutItemDetail.attributes?.margin || {};
    style.marginTop = isScreenSM ? top?.desktop : top?.mobile;
    style.marginBottom = isScreenSM ? bottom?.desktop : bottom?.mobile;
    style.marginLeft = isScreenSM ? left?.desktop : left?.mobile;
    style.marginRight = isScreenSM ? right?.desktop : right?.mobile;
    return style;
  }, [isScreenSM, layoutItemDetail.attributes?.margin]);

  if (isScreenLG) {
    if (!layoutItemDetail.display?.large) return <></>;
  } else if (isScreenMD) {
    if (!layoutItemDetail.display?.medium) return <></>;
  } else {
    if (!layoutItemDetail.display?.small) return <></>;
  }

  return (
    <div className="layout-grid" style={{ ...margin }}>
      {NEXT_PUBLIC_DEBUG_LAYOUT === "1" && (
        // debug
        <h1>
          <p>layout: {layoutItem.uid}</p>
          {layoutItem.mode} {JSON.stringify(layoutItem.rowList?.map(({ uid }) => uid))}{" "}
          {JSON.stringify(layoutItemDetail.data)}
        </h1>
      )}

      {layoutItem.rowList?.map((row) => (
        <LayoutItemRow key={row.uid} layoutItem={row} />
      ))}
    </div>
  );
};

export default LayoutItemGrid;

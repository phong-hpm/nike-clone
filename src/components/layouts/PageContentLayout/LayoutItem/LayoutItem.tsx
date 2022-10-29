import { FC, useContext, useMemo } from "react";
import LayoutItemBlock from "./LayoutItemBlock";
import LayoutItemCol from "./LayoutItemCol";
import LayoutItemGrid from "./LayoutItemGrid";
import LayoutItemRow from "./LayoutItemRow";
import { LayoutContext } from "./LayoutProvider";

export interface LayoutItemProps {
  layoutItemId: string;
  className?: string;
}

const LayoutItem: FC<LayoutItemProps> = ({ layoutItemId, className }) => {
  const { layoutItemList } = useContext(LayoutContext);

  const layoutItem = useMemo(
    () => layoutItemList.find(({ uid }) => uid === layoutItemId),
    [layoutItemId, layoutItemList]
  );

  if (layoutItem?.mode === "grid") {
    return <LayoutItemGrid layoutItem={layoutItem} className={className} />;
  }

  if (layoutItem?.mode === "row") {
    return <LayoutItemRow layoutItem={layoutItem} className={className} />;
  }

  if (layoutItem?.mode === "col") {
    return <LayoutItemCol layoutItem={layoutItem} className={className} />;
  }

  if (layoutItem?.mode === "block") {
    return <LayoutItemBlock layoutItem={layoutItem} className={className} />;
  }

  return <></>;
};

export default LayoutItem;

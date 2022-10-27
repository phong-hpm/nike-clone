import { FC } from "react";

// components
import LayoutCard from "../LayoutCard";

const NEXT_PUBLIC_DEBUG_LAYOUT = process.env.NEXT_PUBLIC_DEBUG_LAYOUT;

export interface LayoutItemGridProps {
  layoutItem: ILayoutItem;
}

const LayoutItemBlock: FC<LayoutItemGridProps> = ({ layoutItem }) => {
  return (
    <>
      {NEXT_PUBLIC_DEBUG_LAYOUT === "1" && (
        <h1>
          {layoutItem.mode} {JSON.stringify(layoutItem.card.uid)}{" "}
          {JSON.stringify(layoutItem.detail.data)}
        </h1>
      )}
      <div className="layout-block">
        {layoutItem.card && <LayoutCard layoutCard={layoutItem.card} />}
      </div>
    </>
  );
};

export default LayoutItemBlock;

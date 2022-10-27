import { FC } from "react";

// components
import LayoutItemCol from "./LayoutItemCol";

const NEXT_PUBLIC_DEBUG_LAYOUT = process.env.NEXT_PUBLIC_DEBUG_LAYOUT;

export interface LayoutItemGridProps {
  layoutItem: ILayoutItem;
}

const LayoutItemRow: FC<LayoutItemGridProps> = ({ layoutItem }) => {
  return (
    <>
      {NEXT_PUBLIC_DEBUG_LAYOUT === "1" && (
        // debug
        <h1>
          <p>layout: {layoutItem.uid}</p>
          {layoutItem.mode} {JSON.stringify(layoutItem.colList?.map(({ uid }) => uid))}{" "}
          {JSON.stringify(layoutItem.detail.data)}
        </h1>
      )}

      <div className={`layout-row flex flex-wrap ml-[-12px] mt-[-12px]`}>
        {layoutItem.colList?.map((col) => (
          <LayoutItemCol key={col.uid} layoutItem={col} className="pt-3 pl-3" />
        ))}
      </div>
    </>
  );
};

export default LayoutItemRow;

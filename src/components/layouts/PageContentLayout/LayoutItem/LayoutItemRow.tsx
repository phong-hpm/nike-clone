import { FC } from "react";

// components
import LayoutItem from "./LayoutItem";

export interface LayoutItemRowProps {
  layoutItem: ILayoutItem;
  className?: string;
}

const LayoutItemRow: FC<LayoutItemRowProps> = ({ layoutItem, className }) => {
  const items = layoutItem.detail?.items || [];

  return (
    <div
      data-mode="row"
      id={layoutItem.detail.id}
      className={cls("w-full flex flex-wrap", items.length > 1 && "mx-[-6px]", className)}
    >
      {items.map((layoutItemId) => (
        <LayoutItem
          key={layoutItemId}
          layoutItemId={layoutItemId}
          className={cls(items.length > 1 && "px-1.5")}
        />
      ))}
    </div>
  );
};

export default LayoutItemRow;

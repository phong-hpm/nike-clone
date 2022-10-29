import { FC } from "react";

// components
import LayoutCard from "../LayoutCard";

export interface LayoutItemBlockProps {
  layoutItem: ILayoutItem;
  className?: string;
}

const LayoutItemBlock: FC<LayoutItemBlockProps> = ({ layoutItem, className }) => {
  return (
    <div data-mode="block" className={className}>
      {layoutItem.card && <LayoutCard layoutCard={layoutItem.card} />}
    </div>
  );
};

export default LayoutItemBlock;

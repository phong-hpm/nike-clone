import { FC } from "react";

// components
import LayoutItemGrid from "./LayoutItem/LayoutItemGrid";

export interface PageContentLayoutProps {
  layout: ILayout;
}

export const PageContentLayout: FC<PageContentLayoutProps> = ({ layout }) => {
  return (
    <>
      {layout.gridList.map((grid) => (
        <LayoutItemGrid key={grid.uid} layoutItem={grid} />
      ))}
    </>
  );
};

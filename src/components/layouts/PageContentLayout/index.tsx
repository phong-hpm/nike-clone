import { FC } from "react";

// components
import LayoutProvider from "./LayoutItem/LayoutProvider";
import LayoutItem from "./LayoutItem/LayoutItem";
import DebuggerProvider from "./Debugger/DebuggerProvider";

export interface PageContentLayoutProps {
  layout: ILayout;
  layoutItemList: ILayoutItem[];
}

export const PageContentLayout: FC<PageContentLayoutProps> = ({ layout, layoutItemList }) => {
  return (
    <div className="page-spacing pb-15">
      <DebuggerProvider layout={layout} layoutItemList={layoutItemList}>
        <LayoutProvider layoutItemList={layoutItemList}>
          {layout.detail?.items.map((layoutItemId) => (
            <LayoutItem key={layoutItemId} layoutItemId={layoutItemId} />
          ))}
        </LayoutProvider>
      </DebuggerProvider>
    </div>
  );
};

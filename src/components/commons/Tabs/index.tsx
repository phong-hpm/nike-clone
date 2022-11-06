import { FC, HTMLAttributes, ReactNode } from "react";

// components
import TabsProvider from "./TabsProvider";

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  selected?: number;
  onChangeTab?: (index: number) => void;
  children: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ children, selected, onChangeTab, ...props }) => {
  return (
    <TabsProvider selected={selected} onChangeTab={onChangeTab}>
      <div {...props}>{children}</div>
    </TabsProvider>
  );
};

export * from "./TabList";
export * from "./Tab";
export * from "./TabPanels";
export * from "./TabPanel";

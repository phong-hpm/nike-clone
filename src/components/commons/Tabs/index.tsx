import { FC, HTMLAttributes, ReactNode } from "react";

// components
import TabsProvider from "./TabsProvider";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ children }) => {
  return <TabsProvider>{children}</TabsProvider>;
};

export * from "./TabList";
export * from "./Tab";
export * from "./TabPanels";
export * from "./TabPanel";

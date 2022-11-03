import React, { FC, ReactNode, useMemo } from "react";

// components
import { TabPanel, TabPanelProps } from "./TabPanel";

export interface TabPanelsProps {
  children: ReactNode;
}

export const TabPanels: FC<TabPanelsProps> = ({ children: childrenProp }) => {
  const children = useMemo(() => {
    return React.Children.map(childrenProp, (child, index) => {
      if (React.isValidElement(child) && child.type === TabPanel) {
        // pass [index] prop for child
        return React.cloneElement(child, { index } as TabPanelProps);
      }
      return child;
    });
  }, [childrenProp]);

  return <>{children}</>;
};

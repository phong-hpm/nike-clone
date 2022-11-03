import { FC, HTMLAttributes, useContext } from "react";
import { TabsContext } from "./TabsProvider";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  index?: number;
}

export const TabPanel: FC<TabPanelProps> = ({ index, className, ...props }) => {
  const { selected } = useContext(TabsContext);

  return <div {...props} className={cls(selected === index ? "block" : "hidden", className)} />;
};

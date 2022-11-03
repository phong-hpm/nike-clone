import React, { FC, HTMLAttributes, useMemo } from "react";

// components
import { Tab, TabProps } from "./Tab";

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  index?: number;
}

export const TabList: FC<TabListProps> = ({
  index,
  className,
  children: childrenProp,
  ...props
}) => {
  const children = useMemo(() => {
    return React.Children.map(childrenProp, (child, index) => {
      if (React.isValidElement(child) && child.type === Tab) {
        // pass [index] prop for child
        return React.cloneElement(child, { index } as TabProps);
      }
      return child;
    });
  }, [childrenProp]);

  return (
    <div {...props} className={cls("flex", className)}>
      {children}
    </div>
  );
};

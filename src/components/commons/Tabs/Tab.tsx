import { FC, HTMLAttributes, useContext } from "react";

// components
import { TabsContext } from "./TabsProvider";

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  index?: number;
}

export const Tab: FC<TabProps> = ({ index, className, ...props }) => {
  const { selected, setSelected } = useContext(TabsContext);

  const isSelected = selected === index;

  return (
    <div
      {...props}
      className={cls(
        "cursor-pointer border-b-2 border-transparent text-gray-main py-2 mx-2",
        isSelected && "border-b-black !text-black",
        className
      )}
      onClick={() => setSelected(index || 0)}
    />
  );
};

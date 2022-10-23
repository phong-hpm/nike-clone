import React, { FC, HTMLAttributes, useContext } from "react";
import { MenuContext } from "./MenuProvider";

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: string;
  label: string;
}

export const MenuItem: FC<MenuItemProps> = ({ value, label, className, ...props }) => {
  const { selectedOption, setSelectedOption, onChange } = useContext(MenuContext);

  const handleClick = (event: React.MouseEvent) => {
    // when user click on [selectedOption], do nothing
    if (selectedOption.value === value) return event.stopPropagation();

    setSelectedOption({ value, label });
    onChange({ value, label });
  };

  return (
    <div
      {...props}
      className={cls(
        "py-[2px] cursor-pointer",
        selectedOption.value === value && "text-gray-main cursor-not-allowed",
        className
      )}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

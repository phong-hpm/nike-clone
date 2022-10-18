import React, { FC, HTMLAttributes, useContext } from "react";

// components
import { MenuContext } from "./MenuProvider";
import { IconSvg } from "../IconSvg";

export interface MenuButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export const MenuButton: FC<MenuButtonProps> = ({ className, onClick, ...props }) => {
  const { title, selectedOption, isShow, setShow } = useContext(MenuContext);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(event);
    else setShow(!isShow);

    // if not [stopPropagation], [window.addEventListener("click")] will be fired
    event.stopPropagation();
  };

  return (
    <div
      {...props}
      className={mapClasses("flex cursor-pointer select-none", className)}
      onClick={handleClick}
    >
      {title}
      {!!title && !!selectedOption.label && <p className="mr-1">:</p>}
      {!!selectedOption.label && <p className="text-gray-main">{selectedOption.label}</p>}
      <IconSvg icon="arrow" className={mapClasses("ml-1", isShow ? "arrow-up" : "arrow-down")} />
    </div>
  );
};

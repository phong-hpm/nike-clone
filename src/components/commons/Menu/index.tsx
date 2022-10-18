import React, { FC } from "react";

// components
import { MenuBase } from "./MenuBase";
import { MenuButton } from "./MenuButton";

// components
import MenuProvider, {
  MenuProviderProps,
  MenuOptionType as MenuOptionTypeBase,
} from "./MenuProvider";

export type MenuOptionType = MenuOptionTypeBase;

export interface MenuProps extends Omit<MenuProviderProps, "children"> {
  className?: string;
}

export const Menu: FC<MenuProps> = ({ className, ...props }) => {
  return (
    <MenuProvider {...props}>
      <div className={mapClasses("relative", className)}>
        <MenuButton />
        <MenuBase />
      </div>
    </MenuProvider>
  );
};

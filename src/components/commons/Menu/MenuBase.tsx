import React, { FC, ReactNode, useContext, useEffect, useRef } from "react";
import { MenuItem } from "./MenuItem";

// components
import { MenuContext } from "./MenuProvider";

export interface MenuBaseProps {}

export const MenuBase: FC<MenuBaseProps> = () => {
  const { isShow, setShow, options } = useContext(MenuContext);

  // when [Menu] is opening, every time user click in every where, [Menu] will be closed
  useEffect(() => {
    if (!isShow) return;
    const handleClick = () => setShow(false);

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isShow, setShow]);

  return (
    <div
      className={mapClasses(
        "absolute top-full right-0 transition-z-index overflow-hidden",
        isShow ? "z-500" : "z-0"
      )}
    >
      <div
        className={mapClasses(
          "bg-white w-44 rounded-bl-3xl",
          "transition-transform translate-y-[-100%]",
          isShow && "!translate-y-0"
        )}
      >
        <div className={mapClasses("px-6 py-4")}>
          {options.map(({ value, label }) => (
            <MenuItem key={value} className="text-end" value={value} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
};

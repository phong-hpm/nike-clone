import { FC, SVGProps, useMemo } from "react";
import classNames from "classnames";

// icons
import LogoNike from "./LogoNike";
import LogoJordan from "./LogoJordan";
import Cart from "./Cart";
import Favourite from "./Favourite";
import Search from "./Search";
import Filter from "./Filter";
import Arrow from "./Arrow";

const icons = {
  "logo-nike": LogoNike,
  "logo-jordan": LogoJordan,
  cart: Cart,
  search: Search,
  favourite: Favourite,
  filter: Filter,
  arrow: Arrow,
};

export interface IconSvgProps extends SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
}

export const IconSvg: FC<IconSvgProps> = ({ icon, className, ...props }) => {
  const fillClass = useMemo(() => {
    if (className?.includes("fill-")) return "";
    return "fill-gray-dark-400";
  }, [className]);
  const strokeClass = useMemo(() => {
    if (className?.includes("stroke-")) return "";
    return "stroke-gray-dark-400";
  }, [className]);

  if (!icons[icon]) return <></>;

  return icons[icon]({
    className: classNames(className, fillClass, strokeClass),
    ...props,
  });
};

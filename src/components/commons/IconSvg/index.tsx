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
import Bars from "./Bars";
import TimeFilled from "./TimeFilled";
import Orders from "./Orders";
import Store from "./Store";
import Help from "./Help";
import Location from "./Location";
import Twitter from "./Twitter";
import Facebook from "./Facebook";
import Youtube from "./Youtube";
import Instagram from "./Instagram";

const icons = {
  "logo-nike": LogoNike,
  "logo-jordan": LogoJordan,
  cart: Cart,
  search: Search,
  favourite: Favourite,
  filter: Filter,
  arrow: Arrow,
  "time-filled": TimeFilled,
  bars: Bars,
  help: Help,
  store: Store,
  orders: Orders,
  location: Location,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
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

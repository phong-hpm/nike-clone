import { FC, SVGProps, useMemo } from "react";
import classNames from "classnames";

// icons
import LogoNike from "./LogoNike";
import LogoJordan from "./LogoJordan";

const icons = {
  "logo-nike": LogoNike,
  "logo-jordan": LogoJordan,
};

export interface IconSvgProps extends SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
}

const IconSvg: FC<IconSvgProps> = ({ icon, className, ...props }) => {
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

export default IconSvg;

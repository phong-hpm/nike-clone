import { FC, ReactNode, useState } from "react";

// components
import { IconSvg } from "./IconSvg";

// custom hooks
import { useResize } from "@root/hooks";

export interface CollapseProps {
  toggleable?: boolean;
  isBorderEnd?: boolean;
  defaultExpand?: boolean;
  label?: ReactNode;
  icon?: ReactNode;
  className?: string;
  labelClass?: string;
  labelIconClass?: string;
  contentClass?: string;
  children: ReactNode;
}

export const Collapse: FC<CollapseProps> = ({
  toggleable = true,
  isBorderEnd,
  defaultExpand,
  label,
  icon,
  className,
  labelClass,
  labelIconClass,
  contentClass,
  children,
}) => {
  const { setTargetEl, height } = useResize();

  const [isExpand, setExpand] = useState(!!defaultExpand);

  return (
    <div className={cls("border-t border-neutral-200 py-2", isBorderEnd && "border-b", className)}>
      <div
        className="flex justify-between items-center cursor-pointer py-1"
        onClick={() => toggleable && setExpand(!isExpand)}
      >
        <div className={cls("grow font-medium select-none", labelClass)}>{label}</div>
        {toggleable && (
          <div className="mx-2">
            {icon || (
              <IconSvg
                icon="arrow"
                className={cls(isExpand ? "arrow-up" : "arrow-down", labelIconClass)}
              />
            )}
          </div>
        )}
      </div>

      <div
        className={cls("relative overflow-hidden transition-height", !isExpand && "!h-0")}
        style={{ height }}
      >
        <div ref={(ref) => setTargetEl(ref)} className={cls("py-2 font-light", contentClass)}>
          {children}
        </div>
      </div>
    </div>
  );
};

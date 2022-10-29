import { FC, ReactNode, useEffect, useState } from "react";

// components
import { IconSvg } from "./IconSvg";

// custom hooks
import { useResize } from "@root/hooks";

export interface CollapseProps {
  toggleable?: boolean;
  noBorder?: boolean;
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
  noBorder,
  isBorderEnd,
  defaultExpand = false,
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

  // reset [isExpand] after [toggleable] was updated
  useEffect(() => {
    if (toggleable) {
      setExpand(defaultExpand);
    } else {
      setExpand(true);
    }
  }, [defaultExpand, toggleable]);

  return (
    <div
      className={cls(
        "py-2",
        !noBorder && "border-t border-neutral-200",
        !noBorder && isBorderEnd && "border-b",
        className
      )}
    >
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

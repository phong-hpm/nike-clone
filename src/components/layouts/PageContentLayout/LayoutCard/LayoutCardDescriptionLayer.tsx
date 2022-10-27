import { FC, useMemo } from "react";

// components
import { Button } from "@root/components/commons";

export interface LayoutCardDescriptionLayerProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardDescriptionLayer: FC<LayoutCardDescriptionLayerProps> = ({ layoutCardDetail }) => {
  const { colorTheme, subtitleProps, titleProps, bodyProps, textLocation } = layoutCardDetail;

  const textHorizontal = useMemo(() => {
    const { horizontal } = textLocation;
    if (horizontal === "start") return `items-start`;
    if (horizontal === "center") return `items-center text-center`;
    if (horizontal === "end") return `items-end`;
  }, [textLocation]);

  const textVertical = useMemo(() => {
    const { vertical } = textLocation;
    if (vertical === "after") return "relative";
    let classes = "absolute z-1 top-0 left-0 w-full h-full";
    if (vertical === "start") classes = `${classes} justify-start`;
    if (vertical === "center") classes = `${classes} justify-center`;
    if (vertical === "end") classes = `${classes} justify-end`;
    return classes;
  }, [textLocation]);

  return (
    <div
      className={cls(
        "flex flex-col p-6 md:p-12",
        textHorizontal,
        textVertical,
        colorTheme === "dark" ? "text-black" : "text-white"
      )}
    >
      <p style={{ color: subtitleProps?.textColor }}>{subtitleProps?.text}</p>
      <p
        data-font={titleProps?.fontFamily}
        className={cls(
          "text-2xl uppercase",
          titleProps?.fontFamily === "marketing" && "font-nike-futura font-medium",
          titleProps?.fontFamily === "marketing" &&
            (titleProps?.fontSize === "small" ? "text-5xl" : "text-7xl")
        )}
        style={{ color: titleProps?.textColor }}
      >
        {titleProps?.text}
      </p>
      <p className={cls("font-light")} style={{ color: bodyProps?.textColor }}>
        {bodyProps?.text}
      </p>

      {!!layoutCardDetail.actionButtons?.length && (
        <div className="flex gap-2 mt-8">
          {layoutCardDetail.actionButtons?.map((action) => (
            <Button key={action.id} isFull={false} theme={colorTheme} variant="contain">
              {action.actionText}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayoutCardDescriptionLayer;

import { FC, useMemo } from "react";

// components
import { Button } from "@root/components/commons";

export interface LayoutCardDescriptionLayerProps {
  single?: boolean;
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardDescriptionLayer: FC<LayoutCardDescriptionLayerProps> = ({
  single,
  layoutCardDetail,
}) => {
  const {
    colorTheme,
    textLocation,
    containerType,
    subtitleProps,
    titleProps,
    bodyProps,
    actionButtons,
  } = layoutCardDetail;

  const textHorizontal = useMemo(() => {
    const { horizontal } = textLocation || {};
    if (horizontal === "start") return `items-start`;
    if (horizontal === "center") return `items-center text-center`;
    if (horizontal === "end") return `items-end`;
  }, [textLocation]);

  const textVertical = useMemo(() => {
    const { vertical } = textLocation || {};

    if (vertical === "start") return `justify-start py-3 lg:py-6`;

    let classes = "py-6 lg:py-12";
    if (vertical === "after") return `relative ${classes}`;

    if (!single) {
      classes = `absolute z-1 top-0 bottom-0 left-6 right-6 lg:left-12 lg:right-12 ${classes}`;
    }
    if (vertical === "center") classes = `${classes} justify-center`;
    if (vertical === "end") classes = `${classes} justify-end`;

    return classes;
  }, [single, textLocation]);

  const subTitleElement = useMemo(() => {
    if (!subtitleProps?.text) return null;

    return (
      <p
        className={cls(
          (textLocation?.vertical === "after" || textLocation?.vertical === "start") &&
            "text-sm text-gray-main"
        )}
        style={{ color: subtitleProps?.textColor }}
        dangerouslySetInnerHTML={{ __html: subtitleProps?.text }}
      />
    );
  }, [subtitleProps, textLocation?.vertical]);

  const titleElement = useMemo(() => {
    if (!titleProps?.text) return null;

    return (
      <p
        data-font={titleProps?.fontFamily}
        className={cls(
          "text-2xl",
          titleProps?.fontFamily === "marketing" && "font-nike-futura font-medium uppercase",
          titleProps?.fontFamily === "marketing" &&
            (titleProps?.fontSize === "small" ? "text-5xl" : "text-7xl")
        )}
        style={{ color: titleProps?.textColor }}
        dangerouslySetInnerHTML={{ __html: titleProps?.text }}
      />
    );
  }, [titleProps]);

  const bodyElement = useMemo(() => {
    if (!bodyProps?.text) return null;

    return (
      <p
        className={cls(
          "font-light",
          (textLocation?.vertical === "after" || textLocation?.vertical === "start") && "text-sm",
          containerType === "text" && "!text-xl"
        )}
        style={{ color: bodyProps?.textColor }}
        dangerouslySetInnerHTML={{ __html: bodyProps?.text }}
      />
    );
  }, [bodyProps, containerType, textLocation?.vertical]);

  const actionButtonElements = useMemo(() => {
    if (!actionButtons?.length) return null;

    return (
      <div className="flex gap-2 mt-6">
        {actionButtons?.map(
          (action) => (
            console.log("action.actionStyle", action),
            (
              <Button
                key={action.id}
                isFull={false}
                theme={colorTheme}
                variant={action.actionType === "link" ? "link" : "contain"}
              >
                {action.actionText}
              </Button>
            )
          )
        )}
      </div>
    );
  }, [actionButtons, colorTheme]);

  if (!subTitleElement && !titleElement && !bodyElement && !actionButtonElements) return <></>;

  return (
    <div
      className={cls(
        "flex flex-col gap-2",
        textHorizontal,
        textVertical,
        colorTheme === "dark" ? "text-black" : "text-white"
      )}
    >
      {subTitleElement}
      {titleElement}
      {bodyElement}

      {actionButtonElements}
    </div>
  );
};

export default LayoutCardDescriptionLayer;

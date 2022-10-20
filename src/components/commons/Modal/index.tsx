import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isShow: boolean;
  isFull?: boolean;
  onHide?: () => void;
  children?: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  isShow: isShowProp,
  isFull,
  className,
  children,
  onHide,
}) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const [isShow, setShow] = useState(false);

  const handleHide = (event: React.MouseEvent<HTMLDivElement>) => {
    onHide?.();
    event.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflowY = isShow ? "hidden" : "auto";

    if (!backdropRef.current) return;
    backdropRef.current.style.top = `${isShow ? document.body.scrollTop : 0}px`;
  }, [isShow]);

  useEffect(() => {
    setShow(isShowProp);
  }, [isShowProp]);

  if (!isShow) return <></>;

  return createPortal(
    <div
      ref={backdropRef}
      className={mapClasses(
        "backdrop fixed top-0 left-0 w-full h-screen",
        "flex justify-center items-center",
        "h-screen bg-black/[0.3]"
      )}
      onClick={handleHide}
    >
      <div
        className={mapClasses(
          "modal fixed top-0 left-0 w-full h-screen flex justify-center items-center"
        )}
      >
        <div
          className={mapClasses(
            "w-[920px] max-w-[calc(100vh-40px)] max-h-[calc(100vw-40px)]",
            "overflow-hidden",
            !isFull && "rounded-xl",
            isFull && "!w-full !h-full !max-h-full !max-w-full",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={mapClasses(
              "w-full max-h-[calc(100vh-40px)] overflow-y-hidden bg-white",
              isFull && "!w-full !h-full !max-h-full !max-w-full"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

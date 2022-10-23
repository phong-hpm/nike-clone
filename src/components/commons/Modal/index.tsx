import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// components
import { FIXED_CONTAINER_ID } from "../AutoFixed";

enum ANIMATION_STEPS {
  WAITING = "WAITING",
  RUNNING_IN = "RUNNING_IN",
  RUNNING_OUT = "RUNNING_OUT",
}

export interface ModalProps {
  isShow: boolean;
  isFull?: boolean;
  contentClass?: string;
  duration?: number;
  animation?: "slide-down" | "slide-up" | "slide-right" | "fade";
  position?: "center" | "left" | "right";
  children?: ReactNode;
  onHide?: () => void;
  /**
   * Will be fired after animation "out" has done
   */
  afterHide?: () => void;
}

export const Modal: FC<ModalProps> = ({
  isShow: isShowProp,
  isFull,
  contentClass,
  duration = 300,
  animation = "fade",
  position = "center",
  children,
  onHide,
  afterHide,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isShow, setShow] = useState(false);
  const [animationStep, setAnimationStep] = useState<ANIMATION_STEPS>(ANIMATION_STEPS.WAITING);

  // handle removing body's scrollbar when modal is openning
  useEffect(() => {
    const srollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflowY = isShow ? "hidden" : "auto";
    // [overflowY = 'hidden'] will remove [scrollbar], then body clientWidth will be increated
    // we will add padding-right which will replace for the space of [scrollbar]
    document.body.style.paddingRight = isShow ? `${srollBarWidth}px` : "0px";

    // update fixed-container's padding-right when body [overflowY = 'hidden']
    const fixedContainerEl = document.getElementById(FIXED_CONTAINER_ID);
    if (fixedContainerEl) {
      fixedContainerEl.style.paddingRight = isShow ? `${srollBarWidth}px` : "0";
    }

    if (!containerRef.current) return;
    containerRef.current.style.top = `${isShow ? document.body.scrollTop : 0}px`;
  }, [isShow]);

  useEffect(() => {
    if (isShowProp) return setShow(true);

    setTimeout(() => {
      setShow(false);
      setAnimationStep(ANIMATION_STEPS.WAITING);
      afterHide?.();
    }, duration);
  }, [isShowProp, duration, animation, afterHide]);

  // update [animationStep]
  useEffect(() => {
    setTimeout(() => {
      setAnimationStep(isShowProp ? ANIMATION_STEPS.RUNNING_IN : ANIMATION_STEPS.RUNNING_OUT);
    }, 1);
  }, [isShowProp]);

  if (!isShow) return <></>;

  const animationClasses =
    animation === "fade"
      ? [
          animationStep === ANIMATION_STEPS.RUNNING_IN && "fade-in",
          animationStep === ANIMATION_STEPS.RUNNING_OUT && "fade-out",
        ]
      : [animation, animationStep === ANIMATION_STEPS.RUNNING_IN && "animation-show"];

  const contentRounded = isFull ? "rounded-0" : position === "center" && "rounded-xl";
  const contentHeight = isFull || position !== "center" ? "h-full" : "max-h-[calc(100vh-40px)]";
  const contentWidth = isFull
    ? "w-full"
    : position === "center"
    ? "w-[920px] max-w-[calc(100vw-40px)]"
    : "max-w-96";

  return createPortal(
    <div
      ref={containerRef}
      className={cls(
        "fixed z-800 top-0 left-0 w-full h-screen flex justify-center items-center",
        position === "right" && "!justify-end"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* backdrop */}
      <div
        className={cls(
          "absolute top-0 left-0 w-screen h-screen bg-black/[0.5] opacity-0",
          animationStep === ANIMATION_STEPS.RUNNING_IN && "fade-in",
          animationStep === ANIMATION_STEPS.RUNNING_OUT && "fade-out"
        )}
        onClick={onHide}
      />

      {/* modal content */}
      <div
        className={cls(
          "relative z-1 overflow-y-hidden bg-white",
          contentRounded,
          contentHeight,
          contentWidth,
          animationClasses,
          contentClass
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

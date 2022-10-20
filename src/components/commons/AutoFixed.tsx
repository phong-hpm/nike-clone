import {
  cloneElement,
  FC,
  ReactElement,
  ReactPortal,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const FIXED_CONTAINER_ID = "fixed-container";

const createFixedContainerElement = () => {
  const fixedContainer = document.createElement("div");
  fixedContainer.id = FIXED_CONTAINER_ID;
  fixedContainer.classList.add("is-fixed", "fixed", "z-100", "top-0", "left-0", "w-full", "h-0");

  // add an fixed wrapper element in root DOM
  document.body.append(fixedContainer);
};

export interface AutoFixedProps {
  extendTop?: number;
  autoHide?: boolean;
  children: ReactElement;
}

export const AutoFixed: FC<AutoFixedProps> = ({ extendTop = 0, autoHide, children }) => {
  const stateRef = useRef({ containerTop: 0, containerHeight: 0, lastWindowScrollY: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [portal, setPortal] = useState<ReactPortal>();

  // assign [targetRef] to children
  const target = useMemo(() => {
    return cloneElement(children, { ref: (ref: HTMLElement) => (targetRef.current = ref) });
  }, [children]);

  // listen if window is scrolling, keep [containerEl] inside the screen and control translateY
  // when user scroll down:
  //   if scrolled over [containerEl]'s top position, we will set translateY(-100%) to {HIDE} it
  //   else, we only set [containerEl]'s top position to fit with the top of viewport
  // when user scroll up:
  //   if scrolled over [containerEl]'s top position, we will set translateY(0) to {SHOW} it
  //   else, we only set [containerEl]'s top position to fit with the top of viewport
  const handleWindowScroll = useCallback(() => {
    const fixedContainerEl = document.getElementById(FIXED_CONTAINER_ID);
    const containerEl = containerRef.current;
    if (!fixedContainerEl || !containerEl || !targetRef.current) return;

    // when user reload, if window has scrollY, browser will keep the scrollY value,
    //   and render page with the same scroll, it will make wrong flow
    const scrollY = mounted ? window.scrollY : 0;
    const { containerTop, containerHeight, lastWindowScrollY } = stateRef.current;

    // [extendTop] CAN NOT greater than [containerTop]
    if (Math.max(containerTop - extendTop, 0) >= scrollY) {
      // move [target] back to start point
      setPortal(undefined);
    } else {
      // move [target] to fixed point
      setPortal(createPortal(target, fixedContainerEl));

      if (autoHide) {
        targetRef.current.style.position = "relative";
        if (lastWindowScrollY > scrollY) {
          // scroll up
          targetRef.current.style.height = `${containerHeight}px`;
        } else {
          // scroll down
          targetRef.current.style.height = "0px";
        }
      }
    }

    if (mounted) stateRef.current.lastWindowScrollY = scrollY;
  }, [mounted, extendTop, autoHide, target]);

  // repairing
  // add an fixed wrapper element into [body] if not existed
  useEffect(() => {
    if (!document.getElementById(FIXED_CONTAINER_ID)) {
      createFixedContainerElement();
    }

    if (containerRef.current) {
      const { top, height } = containerRef.current.getBoundingClientRect();
      // set only 1 time
      if (!stateRef.current.containerTop) stateRef.current.containerTop = Math.max(top, 0);
      if (!stateRef.current.containerHeight) stateRef.current.containerHeight = height;
    }

    setMounted(true);
  }, []);

  // add listener event [resize]
  useEffect(() => {
    if (!containerRef.current || !target) return;
    handleWindowScroll();

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [autoHide, target, handleWindowScroll]);

  return <div ref={containerRef}>{portal || target}</div>;
};

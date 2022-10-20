import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

const getInnerHeight = (element: HTMLElement) => {
  const styles = window.getComputedStyle(element);
  const paddingTop = Number(styles.paddingTop.replace("px", ""));
  const paddingBottom = Number(styles.paddingBottom.replace("px", ""));
  return element.clientHeight - paddingBottom - paddingTop;
};

const getOuterHeight = (element: HTMLElement) => {
  const styles = window.getComputedStyle(element);
  const marginTop = Number(styles.marginTop.replace("px", ""));
  const marginBottom = Number(styles.marginBottom.replace("px", ""));
  return element.offsetHeight + marginTop + marginBottom;
};

const getTotalSiblingHeights = (containerElement: HTMLElement, targetElement: HTMLElement) => {
  let restHeight = 0;

  // Loop on all sibling to get heights
  const siblings = containerElement?.children as unknown as HTMLElement[];
  for (let element of siblings) {
    if (element !== targetElement) restHeight += getOuterHeight(element);
  }

  return restHeight;
};

const useScroll = (
  containerId?: string
): [Dispatch<SetStateAction<HTMLElement | null>>, boolean] => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [isScrolling, setScrolling] = useState(false);

  const computeHeight = useCallback(
    (containerElement: HTMLElement) => {
      if (!targetElement || !targetElement.parentElement?.children) return;

      const parrentInnerHeight = getInnerHeight(targetElement.parentElement);
      let restHeight = getTotalSiblingHeights(containerElement, targetElement);

      const height = Math.max(0, parrentInnerHeight - restHeight);

      targetElement.style.height = `${height}px`;
      targetElement.style.overflowY = `auto`;
      // make a space between children and scrollbar
      targetElement.style.marginRight = `-20px`;
      targetElement.style.paddingRight = `20px`;
    },
    [targetElement]
  );

  // watch for changing of [targetElement]'s height
  useEffect(() => {
    if (!targetElement) return;
    const element = targetElement;
    const observer = new ResizeObserver(() =>
      setScrolling(element.scrollHeight !== element.clientHeight)
    );
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [targetElement]);

  // watch for changing of [targetElement]'s parent height
  useEffect(() => {
    const containerElement =
      document.getElementById(containerId || "") || targetElement?.parentElement;

    if (!containerElement) return;

    // update height everytime container resized
    const observer = new ResizeObserver(() => computeHeight(containerElement));
    observer.observe(containerElement);

    return () => observer.unobserve(containerElement);
  }, [containerId, targetElement?.parentElement, computeHeight]);

  return [setTargetElement, isScrolling];
};

export default useScroll;

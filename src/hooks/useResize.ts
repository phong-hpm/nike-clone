import { useEffect, useState } from "react";

export const useResize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!targetEl) return;

    const observer = new ResizeObserver(() => {
      setWidth(targetEl.offsetWidth);
      setHeight(targetEl.offsetHeight);
    });
    observer.observe(targetEl);

    return () => observer.unobserve(targetEl);
  }, [targetEl]);

  return { setTargetEl, width, height };
};

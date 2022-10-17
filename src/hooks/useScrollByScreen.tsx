import { useCallback, useEffect, useState } from "react";

const useScrollByScreen = () => {
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);

  const triggerUpdate = useCallback(() => {
    if (!targetEl) return;
    const { top } = targetEl.getBoundingClientRect();

    targetEl.style.height = `${window.innerHeight - top}px`;
    targetEl.style.overflowX = `auto`;
  }, [targetEl]);

  useEffect(() => {
    if (!targetEl) return;
    const handleResize = () => triggerUpdate();

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [targetEl, triggerUpdate]);

  return { setTargetEl, triggerUpdate };
};

export default useScrollByScreen;

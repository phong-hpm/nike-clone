import { FC, HTMLAttributes, useEffect, useRef } from "react";

export interface AutoSquareProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * [AutoSquare] always keep itself to be square,
 * when it's width was changed, it's height will be update automatically
 */
const AutoSquare: FC<AutoSquareProps> = (props) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const divEl = divRef.current;
    if (!divEl) return;

    const handleResize = () => {
      divEl.style.height = `${divEl.clientWidth}px`;
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(divEl);

    return () => observer.unobserve(divEl);
  }, []);

  return <div ref={divRef} {...props} />;
};

export default AutoSquare;

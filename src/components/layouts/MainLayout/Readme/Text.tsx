import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string;
  /**
   * highlight
   */
  h?: boolean;
  /**
   * font-medium
   */
  b?: boolean;
  /**
   * underline
   */
  u?: boolean;
}

const Text: FC<TextProps> = ({ h, b, u, text, children, className, ...props }) => {
  console.log("Text");
  const spanRef = useRef<HTMLSpanElement>(null);
  // [id] will make [spanEl.outerHTML] is unique
  const [id] = useState(uuid());

  // auto add/remove spacing
  useEffect(() => {
    const spanEl = spanRef.current;
    if (!spanEl) return;
    const parentInnerHTML = spanEl.parentElement?.innerHTML || "";
    const spanOuterHTML = spanEl.outerHTML;
    const index = parentInnerHTML.indexOf(spanOuterHTML);

    const beforeLetter = parentInnerHTML[index - 1];
    if (!beforeLetter || beforeLetter === " ") spanEl.classList.remove("ml-1");
    else spanEl.classList.add("ml-1");

    const afterLetter = parentInnerHTML[index + spanOuterHTML.length];
    if (!afterLetter || [" ", ",", ".", ":"].includes(afterLetter)) spanEl.classList.remove("mr-1");
    else spanEl.classList.add("mr-1");
  }, [id]);

  return (
    <span
      ref={spanRef}
      {...props}
      id={id}
      className={cls(
        h && "border bg-neutral-100 rounded px-1",
        b && "font-medium",
        u && "underline",
        className
      )}
    >
      {text || children}
    </span>
  );
};

export default Text;

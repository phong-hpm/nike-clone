import useScroll from "@root/hooks/useScroll";
import { FC, ReactNode } from "react";

export interface ModalBodyProps {
  className?: string;
  children: ReactNode;
}

export const ModalBody: FC<ModalBodyProps> = ({ className, children }) => {
  const [setTargetElement] = useScroll();

  return (
    <div ref={setTargetElement} className={mapClasses("w-full px-5", className)}>
      {children}
    </div>
  );
};

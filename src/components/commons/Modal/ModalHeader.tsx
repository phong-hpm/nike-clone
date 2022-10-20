import { FC, ReactNode } from "react";

export interface ModalHeaderProps {
  onHide?: () => void;
  className?: string;
  children?: ReactNode;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ className, onHide, children }) => {
  return (
    <div
      className={mapClasses(
        "relative flex items-center",
        "w-full min-h-14 px-5 py-4",
        "border border-transparent border-b-neutral-100",
        className
      )}
    >
      {children}
      {onHide && (
        <button className="absolute top-0 right-0 px-5 py-4" onClick={onHide}>
          <i className="g72-x-thick" />
        </button>
      )}
    </div>
  );
};

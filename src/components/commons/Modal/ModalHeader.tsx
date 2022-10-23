import { FC, ReactNode } from "react";

// components
import { ButtonIcon } from "../ButtonIcon";

export interface ModalHeaderProps {
  isBorder?: boolean;
  onHide?: () => void;
  className?: string;
  closeBtnClass?: string;
  children?: ReactNode;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  isBorder = true,
  className,
  closeBtnClass,
  onHide,
  children,
}) => {
  return (
    <div
      className={cls(
        "relative flex items-center",
        children ? "justify-between" : "justify-end",
        "w-full pl-5",
        isBorder && "border border-transparent border-b-neutral-100",
        className
      )}
    >
      {children}
      {onHide && (
        <ButtonIcon className={cls("m-2", closeBtnClass)} onClick={onHide}>
          <i className="g72-x-thick w-6 h-6" />
        </ButtonIcon>
      )}
    </div>
  );
};

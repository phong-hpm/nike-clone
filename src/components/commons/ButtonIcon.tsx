import React, { FC } from "react";

export interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonIcon: FC<ButtonIconProps> = ({ className, ...props }) => {
  return (
    <button
      {...props}
      className={mapClasses(
        "rounded-full hover:bg-neutral-200 p-1.5",
        "transition-background",
        className
      )}
    />
  );
};

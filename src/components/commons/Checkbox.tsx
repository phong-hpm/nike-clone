import { FC, InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  groupClassName?: string;
  checkboxClassName?: string;
  checkmarkClassName?: string;
  labelClassName?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  groupClassName,
  checkboxClassName,
  checkmarkClassName,
  labelClassName,
  ...props
}) => {
  return (
    <div className={mapClasses("checkbox-group", groupClassName)}>
      <div className={mapClasses("checkbox w-5 h-5", checkboxClassName)}>
        <input id={label} type="checkbox" {...props} />
        <span className={mapClasses("checkmark", checkmarkClassName)} />
      </div>

      {label && (
        <label htmlFor={label} className={labelClassName}>
          {label}
        </label>
      )}
    </div>
  );
};

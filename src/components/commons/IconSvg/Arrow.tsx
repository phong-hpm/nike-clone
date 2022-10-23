import { FC, HTMLAttributes } from "react";

const Arrow: FC = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cls("icon-arrow w-6 h-6", className)} />;
};

export default Arrow;

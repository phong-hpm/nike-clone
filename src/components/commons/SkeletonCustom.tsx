import { FC, ReactNode } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

export interface SkeletonCustomProps extends SkeletonProps {
  /**
   * when [Skeleton] will be rendered
   */
  when?: boolean;
  children: ReactNode;
}

export const SkeletonCustom: FC<SkeletonCustomProps> = ({ when, children, ...props }) => {
  const isRenderSkeleton = (when !== undefined && when) || !children;

  return isRenderSkeleton ? <Skeleton {...props} /> : <>{children}</>;
};

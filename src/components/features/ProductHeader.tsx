import { FC } from "react";

// components
import { AutoFixed } from "@root/components/commons";

export interface ProductHeaderProps {
  title: string;
  productCount: number;
}

export const ProductHeader: FC<ProductHeaderProps> = ({ title, productCount }) => {
  return (
    <div className="h-12">
      <AutoFixed>
        <div className="flex items-center bg-white h-12">
          <div className="page-spacing grow flex justify-between">
            <h1 className="font-medium text-3xl is-fixed:!text-lg">
              {title} {!!productCount && `(${productCount})`}
            </h1>
            <div className="flex">
              <div>Hide Filters</div>
              <div className="ml-4">Sort by</div>
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

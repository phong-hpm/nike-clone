import { FC } from "react";

// components
import { AutoFixed, IconSvg, Menu, MenuOptionType } from "@root/components/commons";
import { useRouter } from "next/router";
import { useNavigation } from "@root/hooks";

export interface ProductHeaderProps {
  title: string;
  productCount: number;
  onClickFilter: () => void;
}

export const ProductHeader: FC<ProductHeaderProps> = ({ title, productCount, onClickFilter }) => {
  const { setQuery } = useNavigation();
  const router = useRouter();
  const { order } = router.query;

  console.log(order);

  const handleChangeOrder = (option: MenuOptionType) => {
    setQuery({ order: option.value });
  };

  return (
    <div className="h-12">
      <AutoFixed>
        <div className="flex items-center bg-white h-12">
          <div className="page-spacing grow flex justify-between">
            <h1 className="font-medium text-2xl is-fixed:!text-lg">
              {title} {!!productCount && `(${productCount})`}
            </h1>
            <div className="flex items-center">
              <div className="flex cursor-pointer" onClick={onClickFilter}>
                <p className="mr-2">Hide Filters</p>
                <IconSvg icon="filter" />
              </div>

              <Menu
                className="ml-4"
                title="Sort By"
                defaultValue={(order || "") as string}
                options={[
                  { value: "", label: "Featured" },
                  { value: "newest", label: "Newest" },
                  { value: "price-desc", label: "Price: High-Low" },
                  { value: "price-asc", label: "Price: Low-High" },
                ]}
                onChange={handleChangeOrder}
              />
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

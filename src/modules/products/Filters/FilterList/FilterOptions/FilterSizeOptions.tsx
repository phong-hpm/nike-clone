import { FC, useContext, useMemo } from "react";

// modules
import { ProductsContext } from "@root/modules/products/ProductsContext";

export interface FilterSizeOptionsProps {
  options: IFilterOption[];
}

const FilterSizeOptions: FC<FilterSizeOptionsProps> = ({ options }) => {
  const { filterIdList, updateSelectedOptions } = useContext(ProductsContext);

  const displayOptions = useMemo(
    () =>
      options.sort(({ name: prevName }, { name: nextName }) => {
        if (Number(prevName) === NaN || Number(nextName) === NaN) {
          return prevName > nextName ? 1 : -1;
        }
        return Number(prevName) - Number(nextName);
      }),
    [options]
  );

  return (
    <div className="flex flex-wrap m-[-6px]">
      {displayOptions.map((option) => (
        <div
          key={option.uid}
          className={cls(
            "basis-14 grow flex justify-center items-center",
            "border rounded border-gray-light hover:border-black",
            "m-1.5 py-1.5 cursor-pointer whitespace-nowrap",
            filterIdList.includes(option.uid) && "!border-black"
          )}
          onClick={() => updateSelectedOptions(option.uid)}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};

export default FilterSizeOptions;

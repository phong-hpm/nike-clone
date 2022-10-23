import { FC, useContext, useMemo } from "react";

// modules
import { ProductsContext } from "@root/modules/products/ProductsContext";

export interface FilterColourOptionsProps {
  options: IFilterOption[];
}

const FilterColourOptions: FC<FilterColourOptionsProps> = ({ options }) => {
  const { filterIdList, updateSelectedOptions } = useContext(ProductsContext);

  const displayOptions = useMemo(
    () => options.sort((prev, next) => (prev.name > next.name ? 1 : -1)),
    [options]
  );

  return (
    <div className="grid grid-cols-5 lg:grid-cols-3 gap-3 py-2">
      {displayOptions.map((option) => (
        <div
          key={option.uid}
          className={cls("flex flex-col items-center cursor-pointer min-h-16")}
          onClick={() => updateSelectedOptions(option.uid)}
        >
          <div
            className={cls(
              "relative w-7 h-7 rounded-full p-1",
              `filter-colour-${option.name.toLowerCase()}`
            )}
          >
            {filterIdList.includes(option.uid) && <div className="checkmark" />}
          </div>
          <p className="text-xs text-center mt-0.5">{option.name.replace(/-/g, " ")}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterColourOptions;

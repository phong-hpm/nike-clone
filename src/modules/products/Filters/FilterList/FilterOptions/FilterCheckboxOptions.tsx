import { FC, useContext, useEffect, useState } from "react";

// components
import { Checkbox } from "@root/components/commons";

// modules
import { ProductsContext } from "@root/modules/products/ProductsContext";

// constance
import { MAX_FILTER_OPTIONS } from "@root/constance";

export interface FilterCheckboxOptionsProps {
  options: IFilterOption[];
}

const FilterCheckboxOptions: FC<FilterCheckboxOptionsProps> = ({ options }) => {
  const { filterIdList, updateSelectedOptions } = useContext(ProductsContext);

  const [isMore, setMore] = useState(false);
  const [lessMoretitle, setLessMoreTitle] = useState("+ More");

  const isHasMore = (options?.length || 0) > MAX_FILTER_OPTIONS;

  // handle delay change "Less"/"More" text
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLessMoreTitle(isMore ? "- Less" : "+ More");
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isMore]);

  return (
    <div className={cls("flex flex-col gap-2", isHasMore && "pb-10", !isMore && "max-h-[156px]")}>
      {options.map((option) => (
        <div key={option.uid} className=" hover:text-gray-main">
          <Checkbox
            checked={filterIdList.includes(option.uid)}
            label={option.name}
            onChange={() => updateSelectedOptions(option.uid)}
          />
        </div>
      ))}

      {isHasMore && (
        <div
          className="absolute bottom-0 z-1 w-full bg-white cursor-pointer select-none py-2"
          onClick={() => setMore(!isMore)}
        >
          {lessMoretitle}
        </div>
      )}
    </div>
  );
};

export default FilterCheckboxOptions;

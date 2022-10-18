import { FC, useState } from "react";

// components
import { Checkbox, IconSvg } from "@root/components/commons";

// custom hooks
import { useResize } from "@root/hooks";

const MAX_OPTIONS = 4;

export interface FilterOptionsProps {
  filterOption: IFilterOption;
  filterIdList: string[];
}

const FilterOptions: FC<FilterOptionsProps> = ({ filterIdList, filterOption }) => {
  const [isExpand, setExpand] = useState(true);
  const [isMore, setMore] = useState(false);

  const { setTargetEl, height } = useResize();

  const renderSizeOptions = (options: IFilterOption[] = []) => {
    const sortedOptions = options.sort(({ name: prevName }, { name: nextName }) => {
      if (Number(prevName) === NaN || Number(nextName) === NaN) {
        return prevName > nextName ? 1 : -1;
      }
      return Number(prevName) - Number(nextName);
    });

    return (
      <div className="flex flex-wrap m-[-6px]">
        {sortedOptions.map((option) => (
          <div
            key={option.uid}
            className={mapClasses(
              "basis-14 grow flex justify-center items-center",
              "border rounded border-gray-light hover:border-black",
              "m-1.5 py-1.5 cursor-pointer whitespace-nowrap"
            )}
          >
            {option.name}
          </div>
        ))}
      </div>
    );
  };

  const renderColourOptions = (options: IFilterOption[] = []) => {
    const sortedOptions = options.sort((prev, next) => (prev.name > next.name ? 1 : -1));

    return (
      <div className="grid grid-cols-3 gap-3 py-2">
        {sortedOptions.map((option) => (
          <div
            key={option.uid}
            className={mapClasses("flex flex-col items-center cursor-pointer min-h-16")}
          >
            <div
              className={mapClasses(
                "w-7 h-7 rounded-full",
                `filter-colour-${option.name.toLowerCase()}`
              )}
            />
            <p className="text-xs text-center mt-0.5">{option.name.replace(/-/g, " ")}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderOptionsList = (options: IFilterOption[] = []) => {
    const max = isMore ? options.length : MAX_OPTIONS;

    return options.slice(0, max).map((option) => {
      return (
        <div key={option.uid} className="py-1 hover:text-gray-main">
          <Checkbox defaultChecked={filterIdList.includes(option.uid)} label={option.name} />
        </div>
      );
    });
  };

  const isSpecialFilter = filterOption.name === "Size" || filterOption.name === "Colour";

  return (
    <div className="border-t border-neutral-200">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpand(!isExpand)}
      >
        <p className="py-3 font-medium select-none">{filterOption.name}</p>
        <IconSvg icon="arrow" className={mapClasses(isExpand ? "arrow-down" : "arrow-up")} />
      </div>

      <div className={mapClasses("font-light transition-padding", isExpand && "pb-5")}>
        <div className="overflow-hidden transition-height" style={{ height: height }}>
          <div ref={(ref) => setTargetEl(ref)} className={mapClasses(isExpand ? "py-0" : "!h-0")}>
            {filterOption.name === "Size" && renderSizeOptions(filterOption.options)}
            {filterOption.name === "Colour" && renderColourOptions(filterOption.options)}

            {!isSpecialFilter && renderOptionsList(filterOption.options)}

            {isExpand && !isSpecialFilter && (filterOption?.options?.length || 0) > MAX_OPTIONS && (
              <div className="cursor-pointer select-none" onClick={() => setMore(!isMore)}>
                {isMore ? "- Less" : "+ More"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;

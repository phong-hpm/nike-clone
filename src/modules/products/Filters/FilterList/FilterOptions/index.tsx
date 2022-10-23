import { FC, useState } from "react";

// components
import { Collapse, IconSvg } from "@root/components/commons";

// custom hooks
import { useResize } from "@root/hooks";

// modules
import FilterSizeOptions from "./FilterSizeOptions";
import FilterColourOptions from "./FilterColourOptions";
import FilterCheckboxOptions from "./FilterCheckboxOptions";

export interface FilterOptionsProps {
  toggleable?: boolean;
  filterOption: IFilterOption;
}

const FilterOptions: FC<FilterOptionsProps> = ({ filterOption, toggleable }) => {
  const { setTargetEl, height } = useResize();

  const [isExpand, setExpand] = useState(true);

  const isSpecialFilter = filterOption.name === "Size" || filterOption.name === "Colour";

  return (
    <Collapse label={filterOption.name} defaultExpand>
      {filterOption.name === "Size" && <FilterSizeOptions options={filterOption.options || []} />}
      {filterOption.name === "Colour" && (
        <FilterColourOptions options={filterOption.options || []} />
      )}
      {!isSpecialFilter && <FilterCheckboxOptions options={filterOption.options || []} />}
    </Collapse>
  );

  return (
    <div className="border-t border-neutral-200">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleable && setExpand(!isExpand)}
      >
        <p className="py-3 font-medium select-none">{filterOption.name}</p>
        {toggleable && (
          <IconSvg icon="arrow" className={cls(isExpand ? "arrow-down" : "arrow-up")} />
        )}
      </div>

      <div className={cls("font-light transition-padding", isExpand && "pb-5")}>
        <div className="relative overflow-hidden transition-height" style={{ height }}>
          <div ref={(ref) => setTargetEl(ref)} className={cls(isExpand ? "py-0" : "!h-0")}>
            {filterOption.name === "Size" && (
              <FilterSizeOptions options={filterOption.options || []} />
            )}
            {filterOption.name === "Colour" && (
              <FilterColourOptions options={filterOption.options || []} />
            )}
            {!isSpecialFilter && <FilterCheckboxOptions options={filterOption.options || []} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;

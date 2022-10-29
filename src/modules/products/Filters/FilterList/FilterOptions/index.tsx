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
  const isSpecialFilter = filterOption.name === "Size" || filterOption.name === "Colour";

  return (
    <Collapse label={filterOption.name} toggleable={toggleable} defaultExpand>
      {filterOption.name === "Size" && <FilterSizeOptions options={filterOption.options || []} />}
      {filterOption.name === "Colour" && (
        <FilterColourOptions options={filterOption.options || []} />
      )}
      {!isSpecialFilter && <FilterCheckboxOptions options={filterOption.options || []} />}
    </Collapse>
  );
};

export default FilterOptions;

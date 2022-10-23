import { FC, useContext } from "react";

// modules
import { ProductsContext } from "../../ProductsContext";
import FilterOptions from "./FilterOptions";

export interface FilterListProps {
  toggleable?: boolean;
}

const FilterList: FC<FilterListProps> = ({ toggleable }) => {
  const { filterOptionList } = useContext(ProductsContext);

  return (
    <div className="py-5">
      {filterOptionList.map((filter) => {
        return <FilterOptions key={filter.uid} filterOption={filter} toggleable={toggleable} />;
      })}
    </div>
  );
};

export default FilterList;

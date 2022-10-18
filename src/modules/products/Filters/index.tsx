import { FC, useEffect } from "react";

// components
import { AutoFixed } from "@root/components/commons";

// custom hooks
import { useScrollByScreen } from "@root/hooks";

// components
import FilterOptions from "./FilterOptions";

export interface FiltersProps {
  categoryList: ICategory[];
  filterOptionList: IFilterOption[];
  filterIdList: string[];
}

const Filters: FC<FiltersProps> = ({ filterIdList, categoryList, filterOptionList }) => {
  const { setTargetEl, triggerUpdate } = useScrollByScreen();

  useEffect(() => {
    window.addEventListener("scroll", triggerUpdate);
    return () => window.removeEventListener("scroll", triggerUpdate);
  }, [triggerUpdate]);

  return (
    <AutoFixed extendTop={48}>
      <div className="page-spacing py-4 !pr-0 w-[260px] bg-white">
        <div ref={(ref) => setTargetEl(ref)} className="pr-3">
          <div className="font-medium mb-5">
            {categoryList.map(({ uid, name }) => {
              return (
                <p key={uid} className="pb-2 pr-4 cursor-pointer">
                  {name}
                </p>
              );
            })}
          </div>

          <div className="py-5">
            {filterOptionList.map((filter) => {
              return (
                <FilterOptions key={filter.uid} filterIdList={filterIdList} filterOption={filter} />
              );
            })}
          </div>
        </div>
      </div>
    </AutoFixed>
  );
};

export default Filters;

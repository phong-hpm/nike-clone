import { FC, useEffect } from "react";

// components
import AutoFixed from "../../../../components/commons/AutoFixed";

// custom hooks
import useScrollByScreen from "../../../../hooks/useScrollByScreen";

// components
import FilterOptions from "./FilterOptions";

export interface FiltersProps {
  categoryList: ICategory[];
  filterOptions: IFilterOption[];
  filterIds: string[];
}

const Filters: FC<FiltersProps> = ({ filterIds, categoryList, filterOptions }) => {
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
            {filterOptions.map((filter) => {
              return <FilterOptions key={filter.uid} filterIds={filterIds} filterOption={filter} />;
            })}
          </div>
        </div>
      </div>
    </AutoFixed>
  );
};

export default Filters;

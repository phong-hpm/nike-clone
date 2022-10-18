import { FC, useEffect } from "react";

// components
import { AutoFixed } from "@root/components/commons";

// custom hooks
import { useScrollByScreen } from "@root/hooks";

// components
import FilterOptions from "./FilterOptions";

export interface FiltersProps {
  isShow: boolean;
  categoryList: ICategory[];
  filterOptionList: IFilterOption[];
  filterIdList: string[];
}

const Filters: FC<FiltersProps> = ({ isShow, filterIdList, categoryList, filterOptionList }) => {
  const { setTargetEl, triggerUpdate } = useScrollByScreen();

  useEffect(() => {
    window.addEventListener("scroll", triggerUpdate);
    return () => window.removeEventListener("scroll", triggerUpdate);
  }, [triggerUpdate]);

  return (
    <div>
      {/* spacing, useful when all filters was moved to [fixedContainer] */}
      <div className={mapClasses("transition-width", isShow ? "w-65" : "!w-0")} />
      <AutoFixed extendTop={48}>
        <div
          className={mapClasses(
            "flex justify-end", // support for animation
            "w-65 transition-width bg-white",
            !isShow && "!w-0"
          )}
        >
          <div className="page-spacing py-4 !pr-0">
            <div ref={(ref) => setTargetEl(ref)} className="pr-3">
              <div className="font-medium mb-5">
                {categoryList.map(({ uid, name }) => (
                  <p key={uid} className="pb-2 pr-4 cursor-pointer">
                    {name}
                  </p>
                ))}
              </div>

              <div className="py-5">
                {filterOptionList.map((filter) => {
                  return (
                    <FilterOptions
                      key={filter.uid}
                      filterIdList={filterIdList}
                      filterOption={filter}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

export default Filters;

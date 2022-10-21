import { FC, useContext, useEffect } from "react";

// components
import { AutoFixed } from "@root/components/commons";

// custom hooks
import { useScrollByScreen } from "@root/hooks";

// components
import FilterOptions from "./FilterOptions";
import { ProductsContext } from "../ProductsContext";

export interface FiltersProps {
  isShow: boolean;
}

const Filters: FC<FiltersProps> = ({ isShow }) => {
  const { categoryList, filterOptionList, selectedCategory, updateSelectedCategory } =
    useContext(ProductsContext);

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
          <div className="page-spacing !pr-0">
            <div ref={(ref) => setTargetEl(ref)} className="py-4 pr-3">
              <div className="font-medium mb-5">
                {categoryList.map(({ uid, name }) => {
                  const isSelected = uid === selectedCategory;
                  return (
                    <p
                      key={uid}
                      className={mapClasses("pb-2 pr-4 cursor-pointer", isSelected && "underline")}
                      onClick={() => updateSelectedCategory(uid)}
                    >
                      {name}
                    </p>
                  );
                })}
              </div>

              <div className="py-5">
                {filterOptionList.map((filter) => {
                  return <FilterOptions key={filter.uid} filterOption={filter} />;
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

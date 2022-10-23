import { useContext } from "react";

// modules
import { ProductsContext } from "../ProductsContext";

const CategoryList = () => {
  const { categoryList, selectedCategory, updateSelectedCategory } = useContext(ProductsContext);

  return (
    <div className="flex lg:flex-col gap-8 lg:gap-0 max-h-full overflow-x-auto hide-scroll-bar">
      {categoryList.map(({ uid, name }) => {
        const isSelected = uid === selectedCategory;
        return (
          <p
            key={uid}
            className={cls("py-4 lg:pt-0 cursor-pointer font-medium", isSelected && "underline")}
            onClick={() => updateSelectedCategory(uid)}
          >
            {name}
          </p>
        );
      })}
    </div>
  );
};

export default CategoryList;

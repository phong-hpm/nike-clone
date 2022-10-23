import { useContext, useMemo } from "react";
import Link from "next/link";

// modules
import { ProductsContext } from "@root/modules/products/ProductsContext";

// custom hooks
import { useNavigation } from "@root/hooks";

// utils
import { mapPageUrl } from "@root/utils";

const ProductBreadcrumbs = () => {
  const { navigation } = useContext(ProductsContext);
  const { navigate, onNavigate } = useNavigation();

  const groupNav = useMemo(() => navigation?.parent, [navigation]);

  const handleClick = (nav?: INavigation) => {
    if (!nav) return;
    navigate(mapPageUrl.mapProducts(nav));
    onNavigate?.(nav);
  };

  const isSameFilterIdList = useMemo(() => {
    if (!groupNav?.filterIdList.length || !navigation?.filterIdList.length) return false;

    return (
      JSON.stringify(groupNav.filterIdList.sort()) ===
      JSON.stringify(navigation.filterIdList.sort())
    );
  }, [groupNav?.filterIdList, navigation?.filterIdList]);

  if (navigation?.level !== "link" || isSameFilterIdList) return <></>;

  return (
    <div className="page-spacing">
      <div className="flex text-sm font-medium">
        {groupNav && (
          <>
            <p
              className="hover:text-gray-main cursor-pointer"
              onClick={() => handleClick(groupNav)}
            >
              {groupNav.label}
            </p>
            <p className="px-1.5">/</p>
          </>
        )}
        <p className="hover:text-gray-main cursor-pointer" onClick={() => handleClick(navigation)}>
          {navigation.label}
        </p>
      </div>
    </div>
  );
};

export default ProductBreadcrumbs;

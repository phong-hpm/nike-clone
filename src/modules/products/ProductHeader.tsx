import { FC, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

// components
import { AutoFixed, IconSvg, Menu, MenuOptionType } from "@root/components/commons";

// custom hooks
import { useNavigation } from "@root/hooks";
import useMediaScreen from "@root/hooks/useMediaScreen";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";
import { ProductsContext } from "@root/modules/products/ProductsContext";

// constance
import { SORT_BY_OPTIONS } from "@root/constance";

export interface ProductHeaderProps {
  onClickFilter: () => void;
}

const ProductHeader: FC<ProductHeaderProps> = ({ onClickFilter }) => {
  const { navigation, queryConditions, setProductCount } = useContext(ProductsContext);

  const { data } = useQuery<{ productsAggregate?: { aggregate?: IAggregate } }>(
    graphqlQueries.PRODUCT_AGGREGATE,
    { variables: { _and: queryConditions } }
  );

  const isScreenLG = useMediaScreen("lg");
  const { replaceQuery, setNavigating } = useNavigation();

  const productCount = data?.productsAggregate?.aggregate?.count || 0;

  const handleChangeOrder = (option: MenuOptionType) => {
    setNavigating(true);
    replaceQuery({ order: option.value }, { shallow: true });
  };

  useEffect(() => {
    if (!data?.productsAggregate?.aggregate) return;
    setProductCount(data?.productsAggregate?.aggregate?.count);
  }, [data, setProductCount]);

  return (
    <div>
      <AutoFixed>
        <div className="flex items-center bg-white h-12">
          <div className="page-spacing grow flex items-center justify-between">
            <h1 className="font-medium text-xl is-fixed:text-sm lg:text-2xl is-fixed:lg:text-xl">
              {navigation?.title || ""} {!!productCount && `(${productCount})`}
            </h1>

            <div className="flex items-center">
              <div
                className={cls(
                  "flex cursor-pointer p-1 md:px-3 md:py-1",
                  "rounded-full border border-neutral-300 lg:border-transparent"
                )}
                onClick={onClickFilter}
              >
                <p>
                  <span className="hidden lg:inline mr-1">Hide</span>
                  <span className="hidden md:inline mr-2">Filters</span>
                </p>
                <IconSvg icon="filter" />
              </div>

              {isScreenLG && (
                <Menu title="Sort By" options={SORT_BY_OPTIONS} onChange={handleChangeOrder} />
              )}
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

export default ProductHeader;

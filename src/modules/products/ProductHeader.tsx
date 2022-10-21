import { FC, useContext, useEffect } from "react";

// components
import { AutoFixed, IconSvg, Menu, MenuOptionType } from "@root/components/commons";

// custom hooks
import { useNavigation } from "@root/hooks";
import { useQuery } from "@apollo/client";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";
import { ProductsContext } from "@root/modules/products/ProductsContext";

export interface ProductHeaderProps {
  onClickFilter: () => void;
}

const ProductHeader: FC<ProductHeaderProps> = ({ onClickFilter }) => {
  const { navigation, queryConditions, setProductCount } = useContext(ProductsContext);

  const { data } = useQuery<{ productsAggregate?: { aggregate?: IAggregate } }>(
    graphqlQueries.PRODUCT_AGGREGATE,
    { variables: { _and: queryConditions } }
  );

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
    <div className="h-12">
      <AutoFixed>
        <div className="flex items-center bg-white h-12">
          <div className="page-spacing grow flex justify-between">
            <h1 className="font-medium text-2xl is-fixed:!text-lg">
              {navigation?.title || ""} {!!productCount && `(${productCount})`}
            </h1>
            <div className="flex items-center">
              <div className="flex cursor-pointer" onClick={onClickFilter}>
                <p className="mr-2">Hide Filters</p>
                <IconSvg icon="filter" />
              </div>

              <Menu
                className="ml-4"
                title="Sort By"
                options={[
                  { value: "", label: "Featured" },
                  { value: "newest", label: "Newest" },
                  { value: "price-desc", label: "Price: High-Low" },
                  { value: "price-asc", label: "Price: Low-High" },
                ]}
                onChange={handleChangeOrder}
              />
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

export default ProductHeader;

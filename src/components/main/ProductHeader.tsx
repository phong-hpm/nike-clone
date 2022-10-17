import { useQuery, gql } from "@apollo/client";
import { FC, useEffect, useMemo } from "react";

// custom hooks
import useNavigation from "../../hooks/useNavigation";
import AutoFixed from "../commons/AutoFixed";

const productAggregateQuery = gql`
  query ($whereAnd: [products_bool_exp!]) {
    products_aggregate(where: { _and: $whereAnd }) {
      aggregate {
        count
      }
    }
  }
`;

export interface ProductHeaderProps {
  title: string;
  filterIds: string[];
  setProductCount: (total: number) => void;
}

const ProductHeader: FC<ProductHeaderProps> = ({ title, filterIds, setProductCount }) => {
  const { data, refetch } = useQuery<{ products_aggregate: IAggregate }>(productAggregateQuery, {
    variables: { whereAnd: filterIds.map((id) => ({ filters: { _regex: id } })) },
  });

  const { navigating } = useNavigation();

  const productCount = useMemo(() => {
    return navigating ? 0 : data?.products_aggregate.aggregate.count || 0;
  }, [navigating, data?.products_aggregate]);

  useEffect(() => {
    setProductCount(productCount);
  }, [productCount, setProductCount]);

  useEffect(() => {
    refetch();
  }, [refetch, filterIds]);

  return (
    <div className="h-12">
      <AutoFixed>
        <div className="flex items-center bg-white h-12">
          <div className="page-spacing grow flex justify-between">
            <h1 className="font-medium text-3xl is-fixed:!text-lg">
              {title} {!!productCount && `(${productCount})`}
            </h1>
            <div className="flex">
              <div>Hide Filters</div>
              <div className="ml-4">Sort by</div>
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

export default ProductHeader;

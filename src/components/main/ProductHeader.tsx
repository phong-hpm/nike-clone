import { useQuery, gql } from "@apollo/client";
import { FC, useEffect } from "react";

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
  navigating: boolean;
  filterIds: string[];
}

const ProductHeader: FC<ProductHeaderProps> = ({ navigating, filterIds }) => {
  const { data, refetch } = useQuery<{ products_aggregate: IAggregate }>(productAggregateQuery, {
    variables: { whereAnd: filterIds.map((id) => ({ filters: { _regex: id } })) },
  });

  useEffect(() => {
    refetch();
  }, [refetch, filterIds]);

  const productCount = navigating ? 0 : data?.products_aggregate.aggregate.count || 0;

  return (
    <div className="page-spacing mb-4">
      <div className="flex justify-between items-end">
        <h3 className="font-medium text-2xl">
          Lifestyle Shoes {!!productCount && `(${productCount})`}
        </h3>
        <div className="flex">
          <div>Hide Filters</div>
          <div className="ml-4">Sort by</div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;

import { useEffect, useMemo, useRef, useState } from "react";
import { NextPage } from "next";
import { useLazyQuery } from "@apollo/client";

// components
import { ProductCard } from "@root/components/features";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";
import { useNavigation } from "@root/hooks";
import { useRouter } from "next/router";

export interface ProductListProps {
  productCount: number;
  filterIdList: string[];
  initialProductList: IProduct[];
}

const PRODUCT_LIST = 21;

const orderBy: Record<string, Record<string, string>> = {
  "price-asc": { current_price: "asc" },
  "price-desc": { current_price: "desc" },
  newest: { update_time: "desc" },
};

const ProductList: NextPage<ProductListProps> = ({
  productCount,
  filterIdList,
  initialProductList,
}) => {
  const router = useRouter();
  // NOTE: [data] will not be reset although we navigating to another page
  const [_, { data, fetchMore, refetch }] = useLazyQuery<{ productList?: IProduct[] }>(
    graphqlQueries.PRODUCT_LIST,
    {
      variables: {
        limit: PRODUCT_LIST,
        offset: PRODUCT_LIST,
        _and: filterIdList.map((id) => ({ filters: { _regex: id } })),
        order_by: orderBy[router.query.order as string],
      },
    }
  );
  const { navigating } = useNavigation();

  const stateRef = useRef({ offset: 0, productCount: productCount, fetching: false });
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  // after refresh page, [isLoadedMore] always be false
  const [isLoadedMore, setLoadedMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const displayProductList = useMemo(() => {
    // if [isLoadedMore] is false, we don't render [data?.productList], because when user navigating
    // to another page, Component will not be unmounted, so ols [data] still available
    //   until [refetch] has done
    // So, we will only display [data?.productList] when [fetchmore] is fired at least 1 time
    if (!isLoadedMore) return initialProductList;
    return [...initialProductList, ...(data?.productList || [])];
  }, [isLoadedMore, initialProductList, data?.productList]);

  // after navigate to another page, [initialProductList] will be updated
  useEffect(() => {
    refetch();
    setLoadedMore(false);
    stateRef.current.offset = initialProductList.length;
  }, [refetch, initialProductList]);

  useEffect(() => {
    setCanLoadMore((displayProductList.length || 0) < productCount);
  }, [displayProductList, productCount]);

  useEffect(() => {
    // when no more data to load, stop the observer
    if (!canLoadMore || !spinnerRef.current) return;
    const snipperEl = spinnerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !stateRef.current.fetching) {
          // [stateRef.current.fetching] will prevent call [fetchMore] multiple times
          // Case: user scroll down, call [fetchMore]
          //       during api is calling, user scroll up, and scrol down again,
          //       without [stateRef.current.fetching], [fetchMore] will be fired multiple time
          stateRef.current.fetching = true;

          fetchMore({
            variables: { offset: stateRef.current.offset, limit: PRODUCT_LIST },
          }).then(() => {
            stateRef.current.fetching = false;
            stateRef.current.offset += PRODUCT_LIST;
            setLoadedMore(true);
          });
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(snipperEl);
    return () => observer.unobserve(snipperEl);
  }, [canLoadMore, fetchMore]);

  return (
    <div>
      {/* Product List */}
      <div className="grid grid-cols-3 gap-4">
        {displayProductList.map((product) => (
          <ProductCard
            key={product.uid}
            loading={navigating}
            product={product}
            onClick={() => router.push("/product-detail/CU4495-010", undefined, { shallow: true })}
          />
        ))}
      </div>

      {/* load more */}
      {canLoadMore && (
        <div ref={spinnerRef} className="flex justify-center py-10">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default ProductList;

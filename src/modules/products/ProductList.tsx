import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NextPage } from "next";
import { useLazyQuery } from "@apollo/client";

// components
import { ProductCard } from "@root/components/features";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";
import { useNavigation } from "@root/hooks";
import { useRouter } from "next/router";
import { ProductsContext } from "./ProductsContext";

// constance
import { PRODUCT_LIMIT, PRODUCT_ORDER_BY, skeletonData } from "@root/constance";

const ProductList: NextPage = () => {
  const router = useRouter();
  const { productCount, queryConditions } = useContext(ProductsContext);
  // NOTE: [data] will not be reset although we navigate to another page
  const [_, { data, fetchMore, refetch }] = useLazyQuery<{ productList?: IProduct[] }>(
    graphqlQueries.PRODUCT_LIST,
    {
      variables: {
        limit: PRODUCT_LIMIT,
        offset: 0,
        _and: queryConditions,
        order_by: PRODUCT_ORDER_BY[router.query.order as string],
      },
    }
  );
  const { navigating, navigate } = useNavigation();

  const stateRef = useRef({ offset: 0, productCount: productCount, fetching: false });
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  // after refresh page, [isLoadedMore] always be false
  const [reloading, setReloading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const displayProductList = useMemo(() => {
    // skeleton
    if (reloading) return skeletonData.productList;
    return data?.productList || [];
  }, [reloading, data?.productList]);

  useEffect(() => {
    if (navigating) setReloading(true);
  }, [navigating]);

  useEffect(() => {
    if (!queryConditions.length) return;
    stateRef.current.fetching = true;
    setReloading(true);

    console.log("refetch");

    refetch().then(() => {
      stateRef.current.fetching = false;
      setReloading(false);
    });
  }, [queryConditions, refetch]);

  useEffect(() => {
    stateRef.current.offset = data?.productList?.length || 0;
  }, [data?.productList]);

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

          console.log("fetchMore");

          fetchMore({
            variables: { offset: stateRef.current.offset, limit: PRODUCT_LIMIT },
          }).then(() => {
            stateRef.current.fetching = false;
            stateRef.current.offset += PRODUCT_LIMIT;
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
      {!reloading && !displayProductList.length && (
        <p className="font-light text-center text-gray-main mt-10">No data found</p>
      )}

      {/* Product List */}
      <div className="grid grid-cols-3 gap-4">
        {displayProductList.map((product) => (
          <ProductCard
            key={product.uid}
            loading={navigating}
            product={product}
            onClick={() => navigate("/product-detail/CU4495-010", { shallow: true })}
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
import { useContext, useMemo, useState } from "react";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";

const Actions = () => {
  const { selectedProduct } = useContext(ProductDetailContext);

  const [selectedSize, setSelectedSize] = useState("");

  const skus = useMemo(() => selectedProduct?.skus || [], [selectedProduct]);

  const availableSkus = useMemo(() => selectedProduct?.availableSkus || [], [selectedProduct]);

  return (
    <>
      <p className="mb-2 font-medium">Select Size</p>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {skus.map((size) => {
          const isSelected = selectedSize === size.skuId;
          const isAvailable = !!availableSkus.find(({ skuId }) => skuId === size.skuId);

          return (
            <div
              key={size.skuId}
              className={mapClasses(
                "bg-[#F7F7F7] border rounded border-neutral-200",
                "py-3 px-2 cursor-pointer",
                isSelected && "!border-black",
                isAvailable && "!bg-transparent hover:border-black"
              )}
              onClick={() => isAvailable && setSelectedSize(size.skuId)}
            >
              <p
                className={mapClasses("text-center text-[#DDDDDD]", isAvailable && "!text-black ")}
              >
                {!!size.localizedSizePrefix && (
                  <span className="mr-1">{size.localizedSizePrefix}</span>
                )}
                <span>{size.localizedSize}</span>
              </p>
            </div>
          );
        })}
      </div>

      <button
        className={mapClasses(
          "w-full rounded-full px-6 py-5 mb-4 font-medium text-white",
          "bg-black border border-black hover:bg-gray-main hover:border-gray-main"
        )}
      >
        Add to Bag
      </button>
      <button
        className={mapClasses(
          "w-full rounded-full px-6 py-5 font-medium text-black",
          "border border-[#CCCCCC] hover:border-black"
        )}
      >
        Favourite
        <span className="ml-3">
          <i className="g72-heart-outline" />
        </span>
      </button>
    </>
  );
};

export default Actions;

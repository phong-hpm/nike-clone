import { useContext, useEffect, useMemo, useRef, useState } from "react";

// components
import { Button } from "@root/components/commons";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";

const Actions = () => {
  const { selectedProduct } = useContext(ProductDetailContext);
  const isScreenLG = useMediaScreen("lg");

  const addToBagButtonRef = useRef<HTMLButtonElement | null>(null);
  const fixedAddToBagRef = useRef<HTMLDivElement | null>(null);

  const [selectedSize, setSelectedSize] = useState("");

  const skus = useMemo(() => selectedProduct?.skus || [], [selectedProduct]);

  const availableSkus = useMemo(() => selectedProduct?.availableSkus || [], [selectedProduct]);

  // handle fixed "Add to Bag" button
  useEffect(() => {
    const element = addToBagButtonRef.current;
    const fixedContainer = fixedAddToBagRef.current;
    if (!element || !fixedContainer || isScreenLG) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isAdd = entries[0].intersectionRatio < 1;
        if (isAdd) fixedContainer.classList.add("!w-screen", "!h-fit");
        else fixedContainer.classList.remove("!w-screen", "!h-fit");
      },
      { threshold: [1] }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
      fixedContainer.classList.remove("!w-screen", "!h-fit");
    };
  }, [isScreenLG]);

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
              className={cls(
                "bg-[#F7F7F7] border rounded border-neutral-200",
                "py-3 px-2 cursor-not-allowed",
                isSelected && "!border-black",
                isAvailable && "!bg-transparent hover:border-black !cursor-pointer"
              )}
              onClick={() => isAvailable && setSelectedSize(size.skuId)}
            >
              <p className={cls("text-center text-[#DDDDDD]", isAvailable && "!text-black ")}>
                {!!size.localizedSizePrefix && (
                  <span className="mr-1">{size.localizedSizePrefix}</span>
                )}
                <span>{size.localizedSize}</span>
              </p>
            </div>
          );
        })}
      </div>

      <Button ref={addToBagButtonRef} variant="contain" className="!px-6 !py-5 mb-4">
        Add to Bag
      </Button>
      <Button variant="outline" className="!px-6 !py-5 mb-4">
        Favourite
        <span className="ml-3">
          <i className="g72-heart-outline" />
        </span>
      </Button>

      <div
        ref={fixedAddToBagRef}
        className={cls(
          "fixed z-100 left-1/2 bottom-0 translate-x-[-50%]",
          "w-5/6 h-0 overflow-x-hidden transition-width"
        )}
      >
        <Button rounded={false} variant="contain" className="!px-6 !py-5 whitespace-nowrap">
          Add to Bag
        </Button>
      </div>
    </>
  );
};

export default Actions;

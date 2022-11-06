import { FC, useEffect, useMemo, useState } from "react";

// components
import { ImageCustom } from "@root/components/commons";
import ProductColorList from "./ProductColorList";
import ProductPrice from "./ProductPrice";

// custom hooks
import { SkeletonCustom } from "@root/components/commons/SkeletonCustom";

const LABELS: Record<string, string> = {
  JUST_IN: "Just In",
  SOLD_OUT: "Sold Out",
  BEST_SELLER: "Best Seller",
  COMING_SOON: "Coming Soon",
  CUSTOMIZABLE: "Customizable",
  IN_STOCK: "In Stock",
  SNKRS: "SNKRS",
  SNKRS_COMING_SOON: "SNKRS Coming Soon",
  nikePlusExclusive: "Nike Plus Exclusive",
};

export interface ProductCardProps {
  isFlexibleHeight?: boolean;
  hasColour?: boolean;
  product: IProduct;
  imageClass?: string;
  onClick: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  isFlexibleHeight,
  hasColour = true,
  product,
  imageClass,
  onClick,
}) => {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const colourCount = product?.productAnotherColors?.length || 0;

  const label = useMemo(() => {
    if (product.label === "IN_STOCK") return "";
    return product.label ? LABELS[product.label] : product.label;
  }, [product.label]);

  useEffect(() => {
    setSelectedImage(product.images?.squarishURL || "");
  }, [product.images?.squarishURL]);

  return (
    <div className="relative">
      <div
        className="flex flex-col cursor-pointer"
        onMouseEnter={() => colourCount > 1 && setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
        onClick={onClick}
      >
        {/* image */}
        <div className="mb-4">
          <ImageCustom
            className={imageClass}
            ratio={1}
            sizes="33vw"
            src={selectedImage || product.images?.squarishURL}
          />
        </div>

        <div className={cls(!isFlexibleHeight && "min-h-[185px]")}>
          {/* thumb: hover */}
          <div className={cls(mouseEntered ? "slide-down-margin mb-3" : "mb-0")}>
            {mouseEntered && (
              <ProductColorList
                list={product.productAnotherColors || []}
                onHover={setSelectedImage}
              />
            )}
          </div>

          {/* label */}
          {label && <p className="font-medium text-red-700">{label}</p>}

          {/* titles */}
          {!mouseEntered && (
            <div className="mb-3">
              <p className="font-medium">
                <SkeletonCustom>{product.title}</SkeletonCustom>
              </p>
              <p className="text-gray-main font-light">
                <SkeletonCustom>{product.subTitle}</SkeletonCustom>
              </p>
              {hasColour && (
                <p className="text-gray-main font-light">
                  <SkeletonCustom when={!colourCount}>
                    {`${colourCount} Colour${colourCount && "s"}`}
                  </SkeletonCustom>
                </p>
              )}
            </div>
          )}

          {/* Price */}
          <ProductPrice price={product.price} />
        </div>
      </div>
    </div>
  );
};

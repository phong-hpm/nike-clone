import { FC, useMemo, useState } from "react";

// components
import { AutoSquare, ImageCustom } from "@root/components/commons";
import ProductColorList from "./ProductColorList";
import ProductPrice from "./ProductPrice";

// custom hooks
import { useNavigation } from "@root/hooks";

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
  loading?: boolean;
  isFlexibleHeight?: boolean;
  product: IProduct;
  imageClass?: string;
  onClick: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  loading,
  isFlexibleHeight,
  product,
  imageClass,
  onClick,
}) => {
  const { navigating } = useNavigation();

  const [mouseEntered, setMouseEntered] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const colourCount = product?.productAnotherColors?.length || 1;

  const label = useMemo(() => {
    if (product.label === "IN_STOCK") return "";
    return LABELS[product.label] || product.label;
  }, [product.label]);

  return (
    <div className="relative">
      {/* loading overlay */}
      {(navigating || loading) && (
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-white/[0.7]" />
      )}

      <div
        className="flex flex-col cursor-pointer"
        onMouseEnter={() => colourCount > 1 && setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
        onClick={onClick}
      >
        {/* image */}
        <AutoSquare className="w-full mb-4">
          <ImageCustom
            className={mapClasses("w-full h-full bg-neutral-100", imageClass)}
            sizes="33vw"
            src={selectedImage || product.images?.squarishURL}
          />
        </AutoSquare>

        <div className={mapClasses(!isFlexibleHeight && "min-h-[185px]")}>
          {/* thumb: hover */}
          <div className={mapClasses(mouseEntered ? "slide-down-margin mb-3" : "mb-0")}>
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
              <p className="font-medium">{product.title}</p>
              <p className="text-gray-main font-light">{product.subTitle}</p>
              <p className="text-gray-main font-light">{`${colourCount} Colour${
                colourCount && "s"
              }`}</p>
            </div>
          )}

          {/* Price */}
          <ProductPrice price={product.price} />
        </div>
      </div>
    </div>
  );
};

import { FC } from "react";

// constance
import { CurrencySymbolMap } from "@root/constance";

export interface ProductPriceProps {
  hideDiscount?: boolean;
  isDiscountInline?: boolean;
  price: IProduct["price"];
}
const ProductPrice: FC<ProductPriceProps> = ({ hideDiscount, isDiscountInline, price }) => {
  const { currency, currentPrice, fullPrice, discounted } = price;
  const discountPercent = Math.ceil((currentPrice / fullPrice) * 100);

  return (
    <>
      <div className="flex">
        <p className="font-medium">
          {CurrencySymbolMap[currency]}
          {currentPrice}
        </p>

        {discounted && (
          <p className="font-light text-gray-main line-through ml-2">
            {CurrencySymbolMap[currency]}
            {fullPrice}
          </p>
        )}
        {isDiscountInline && discounted && (
          <p className="text-green-600 ml-2">{discountPercent}% off</p>
        )}
      </div>
      {!isDiscountInline && !hideDiscount && discounted && (
        <p className="text-green-600">{discountPercent}% off</p>
      )}
    </>
  );
};

export default ProductPrice;

import { FC } from "react";

// constance
import { CurrencySymbolMap } from "@root/constance";

export interface ProductPriceProps {
  price: IProduct["price"];
}
const ProductPrice: FC<ProductPriceProps> = ({ price }) => {
  const { currency, currentPrice, fullPrice, discounted } = price;
  const discountPercent = Math.ceil((currentPrice / fullPrice) * 100);

  return (
    <div>
      <div className="flex mb-3">
        <p className="font-medium mr-2">
          {CurrencySymbolMap[currency]}
          {currentPrice}
        </p>

        {discounted && (
          <p className="font-light text-gray-main line-through">
            {CurrencySymbolMap[currency]}
            {fullPrice}
          </p>
        )}
      </div>
      {discounted && <p className="text-green-600">{discountPercent}% off</p>}
    </div>
  );
};

export default ProductPrice;

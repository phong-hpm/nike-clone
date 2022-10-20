import { FC, useContext } from "react";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";

export interface SubContentsProps {
  onClickViewDetail: () => void;
}

const SubContents: FC<SubContentsProps> = ({ onClickViewDetail }) => {
  const { selectedProduct } = useContext(ProductDetailContext);

  if (!selectedProduct) return <></>;

  return (
    <>
      <div className="mb-8">
        <p className="font-light">{selectedProduct.descriptionPreview}</p>
      </div>

      <ul className="list-disc pl-4 mb-6">
        <li>
          <p className="font-light">
            Colour Shown: <span>{selectedProduct.colorDescription}</span>
          </p>
        </li>
        <li>
          <p className="font-light">
            Style: <span>{selectedProduct.styleColor}</span>
          </p>
        </li>
      </ul>

      <div className="mb-10">
        <span
          className="cursor-pointer border border-transparent border-b-black hover:text-gray-main hover:border-b-gray-main"
          onClick={onClickViewDetail}
        >
          View Product Details
        </span>
      </div>

      <div>
        <p>Free Delivery and Returns</p>
        <p>Free standard delivery with your Nike Membership.</p>
        <p>
          You can return your order for any reason, free of charge, within 30 days.{" "}
          <u>Some exclusions apply.</u>
        </p>
      </div>
    </>
  );
};

export default SubContents;

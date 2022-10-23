import { FC, useContext } from "react";
import Rate from "rc-rate";

// components
import { Collapse } from "@root/components/commons";

// modules
import { ProductDetailContext } from "../ProductDetailProvider";

export interface ProductDescriptionProps {
  onClickViewDetail: () => void;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ onClickViewDetail }) => {
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

      <Collapse
        isBorderEnd
        label="Free Delivery and Returns"
        className="!py-4"
        labelClass="text-xl"
        labelIconClass="thick"
      >
        <p className="mb-4">Free standard delivery with your Nike Membership.</p>
        <ul className="list-disc pl-4">
          <li>
            You can return your order for any reason, free of charge, within 30 days.{" "}
            <span className="font-medium underline">Some exclusions apply.</span>
          </li>
        </ul>
      </Collapse>

      {/* <Collapse
        isBorderEnd
        label={
          <div className="flex justify-between pointer-events-none">
            <p>Review</p>
            <Rate disabled count={5} value={3.5} allowHalf />
          </div>
        }
        className="!py-4"
        labelClass="text-xl"
        labelIconClass="thick"
      >
        <p className="mb-4">Free standard delivery with your Nike Membership.</p>
        <ul className="list-disc pl-4">
          <li>
            You can return your order for any reason, free of charge, within 30 days.{" "}
            <span className="font-medium underline">Some exclusions apply.</span>
          </li>
        </ul>
      </Collapse> */}
    </>
  );
};

export default ProductDescription;

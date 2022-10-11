import { FC } from "react";

const numOfShowImages = 4;

export interface ProductColorListProps {
  list: IProduct[];
  onHover: (url: string) => void;
}

const ProductColorList: FC<ProductColorListProps> = ({ list, onHover }) => {
  const colourCount = list?.length || 1;

  return (
    <div className="flex items-center fade-in">
      {list.slice(0, numOfShowImages).map(({ images }, index) => {
        return (
          <div
            key={index}
            className="w-9 h-9 bg-neutral-100 mr-2"
            onMouseEnter={() => onHover(images.squarishURL)}
          >
            <img loading="lazy" src={images.squarishURL} alt="" />
          </div>
        );
      })}

      {numOfShowImages < colourCount && (
        <p className="text-gray-main font-light">+{colourCount - numOfShowImages}</p>
      )}
    </div>
  );
};

export default ProductColorList;

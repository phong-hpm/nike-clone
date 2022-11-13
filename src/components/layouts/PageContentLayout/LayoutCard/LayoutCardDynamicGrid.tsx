import { FC } from "react";

// components
import LayoutCard from ".";

export interface LayoutCardDynamicGridProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardDynamicGrid: FC<LayoutCardDynamicGridProps> = ({ layoutCardDetail }) => {
  const { featuredCard, sectionHeadline } = layoutCardDetail;

  return (
    <div>
      <p className="text-2xl font-medium mb-3">{sectionHeadline.title}</p>

      {!!featuredCard && <LayoutCard layoutCardDetail={featuredCard} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {(layoutCardDetail?.slides as ILayoutCardDetail[]).map((slide) => {
          return <LayoutCard key={slide.id} layoutCard={{ uid: slide.id, detail: slide }} />;
        })}
      </div>
    </div>
  );
};

export default LayoutCardDynamicGrid;

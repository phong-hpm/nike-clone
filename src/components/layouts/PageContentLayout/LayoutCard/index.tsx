import { FC, useMemo } from "react";

// components
import LayoutCardExternalCollection from "./LayoutCardExternalCollection";
import LayoutCardImage from "./LayoutCardImage";
import LayoutCardVideo from "./LayoutCardVideo";
import LayoutCardFilmStrip from "./LayoutCardFilmStrip";
import LayoutCardSNKRSDrops from "./LayoutCardSNKRSDrops";

const NEXT_PUBLIC_DEBUG_LAYOUT = process.env.NEXT_PUBLIC_DEBUG_LAYOUT;

export interface LayoutCardProps {
  layoutCard: ILayoutCard;
}

const LayoutCard: FC<LayoutCardProps> = ({ layoutCard }) => {
  const layoutCardDetail = useMemo(() => layoutCard.detail, [layoutCard]);

  return (
    <div className="relative layout-card">
      {NEXT_PUBLIC_DEBUG_LAYOUT === "1" && (
        // debug
        <div className="px-3">card {layoutCard.uid}</div>
      )}

      {layoutCardDetail.containerType === "section_headline" && (
        <p className="font-medium text-2xl mb-6">{layoutCardDetail.title}</p>
      )}
      {layoutCardDetail.containerType === "snkrs_drops" && (
        <LayoutCardSNKRSDrops layoutCardDetail={layoutCardDetail} />
      )}
      {layoutCardDetail.containerType === "external_collection" && (
        <LayoutCardExternalCollection layoutCardDetail={layoutCardDetail} />
      )}
      {layoutCardDetail.containerType === "video" && (
        <LayoutCardVideo layoutCardDetail={layoutCardDetail} />
      )}
      {layoutCardDetail.containerType === "image" && (
        <LayoutCardImage layoutCardDetail={layoutCardDetail} />
      )}
      {layoutCardDetail.containerType === "page" && (
        <LayoutCardImage layoutCardDetail={layoutCardDetail} />
      )}
      {layoutCardDetail.containerType === "filmstrip" && (
        <LayoutCardFilmStrip layoutCardDetail={layoutCardDetail} />
      )}
    </div>
  );
};

export default LayoutCard;

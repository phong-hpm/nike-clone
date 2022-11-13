import { FC, useMemo } from "react";

// components
import LayoutCardExternalCollection from "./LayoutCardExternalCollection";
import LayoutCardImage from "./LayoutCardImage";
import LayoutCardVideo from "./LayoutCardVideo";
import LayoutCardFilmStrip from "./LayoutCardFilmStrip";
import LayoutCardSNKRSDrops from "./LayoutCardSNKRSDrops";
import LayoutCardLocalMenu from "./LayoutCardLocalMenu";
import LayoutCardDescriptionLayer from "./LayoutCardDescriptionLayer";
import LayoutCardMergeMenu from "./LayoutCardMergeMenu";
import CardDebugger from "../Debugger/CardDebugger";
import LayoutCardTitle from "./LayoutCardTitle";
import LayoutCardDynamicGrid from "./LayoutCardDynamicGrid";

export interface LayoutCardProps {
  layoutCard?: ILayoutCard;
  layoutCardDetail?: ILayoutCardDetail;
}

const LayoutCard: FC<LayoutCardProps> = ({
  layoutCard,
  layoutCardDetail: layoutCardDetailProp,
}) => {
  const layoutCardDetail = useMemo(
    () => layoutCardDetailProp || layoutCard?.detail,
    [layoutCard, layoutCardDetailProp]
  );

  if (!layoutCardDetail) return <></>;

  return (
    <>
      {!!layoutCard && <CardDebugger cardUid={layoutCard.uid} />}

      <div
        data-mode="card"
        id={layoutCardDetail.id}
        data-container-type={layoutCardDetail.containerType}
        className="relative"
      >
        {layoutCardDetail.containerType === "title" && (
          <LayoutCardTitle layoutCardDetail={layoutCardDetail} />
        )}

        {layoutCardDetail.containerType === "local_menu" && (
          <LayoutCardLocalMenu layoutCardDetail={layoutCardDetail} />
        )}

        {layoutCardDetail.containerType === "merch_menu" && (
          <LayoutCardMergeMenu layoutCardDetail={layoutCardDetail} />
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

        {layoutCardDetail.containerType === "text" && (
          <LayoutCardDescriptionLayer single layoutCardDetail={layoutCardDetail} />
        )}

        {layoutCardDetail.containerType === "page" && (
          <LayoutCardImage layoutCardDetail={layoutCardDetail} />
        )}

        {(layoutCardDetail.containerType === "filmstrip" ||
          layoutCardDetail.containerType === "dynamic_carousel") && (
          <LayoutCardFilmStrip layoutCardDetail={layoutCardDetail} />
        )}

        {layoutCardDetail.containerType === "dynamic_grid" && (
          <LayoutCardDynamicGrid layoutCardDetail={layoutCardDetail} />
        )}
      </div>
    </>
  );
};

export default LayoutCard;

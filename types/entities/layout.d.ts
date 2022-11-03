declare interface ILayout {
  uid: string;
  pageTitle: string;
  detail: {
    id: string;
    items: string[];
  };
}

declare interface ILayoutItem {
  uid: string;
  mode: "grid" | "row" | "col" | "block";
  detail: ILayoutItemDetail;
  card?: ILayoutCard;
}

declare interface ILayoutItemDetail {
  id: string;
  data?: string;
  items?: string[];
  mode: "grid" | "row" | "col" | "block";
  attributes: {
    fluid: boolean;
    margin?: {
      top?: { mobile: number; desktop: number };
      left?: { mobile: number; desktop: number };
      bottom?: { mobile: number; desktop: number };
      right?: { mobile: number; desktop: number };
    };
  };
  display?: { small: boolean; medium: boolean; large: boolean };
  span: { small: number; large: number; medium: number };
}

declare interface ILayoutCard {
  uid: string;
  detail: ILayoutCardDetail;
}

declare interface ILayoutCardDetail {
  id: string;
  containerType:
    | "local_menu"
    | "merch_menu"
    | "section_headline"
    | "snkrs_drops"
    | "external_collection"
    | "video"
    | "image"
    | "text"
    | "page"
    | "filmstrip"
    | "dynamic_carousel"
    | "product_recommender_taxonomy";
  destinationType: "gridwall" | "page" | "url";
  colorTheme: "dark" | "light";
  // media
  landscapeURL: string;
  portraitURL: string;
  preferredOrientation: {
    small: "squarish" | "landscape" | "portrait";
    large: "squarish" | "landscape" | "portrait";
    medium: "squarish" | "landscape" | "portrait";
  };
  assetsIds: { landscape?: string; portrait?: string; squarish?: string };
  assetsAspectRatios: { portrait?: number; landscape?: number; squarish?: number };
  sectionHeadline: { title: string };
  imageHeight: "maintain" | "medium";
  loop: boolean;
  autoPlay: boolean;
  // text
  title: string;
  titleProps: {
    text: string;
    textColor?: string;
    fontSize?: "small" | "medium";
    fontFamily?: "marketing";
  };
  subtitleProps: {
    text: string;
    textColor: string;
  };
  bodyProps: {
    text: string;
    textColor: string;
  };
  captionProps: {
    text: string;
    position: "overlay";
  };
  textLocation: {
    horizontal: "center" | "start" | "end";
    vertical: "center" | "start" | "end" | "after";
  };
  actionButtons: {
    id: string;
    actionText: string;
    buttonStyle: "solid_dark" | "solid_light";
    actionType: "button" | "stacked_cta" | "link";
  }[];
  // slide
  slides: ILayoutCardDetailSlide[] | ILayoutCardDetail[];
  slidesUpcoming: ILayoutCardDetailSlide[] | ILayoutCard[];
  // menu
  items: {
    id: string;
    label: string;
    links: {
      id: string;
      label: string;
    }[];
  }[];
}
declare interface ILayoutCardDetailSlide {
  productId: string;
  styleColor: string;
  isNikeByYou: boolean;
  productThreadId: string;
  isMemberExclusive: boolean;
  aspectRatio: number;
  imgUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  squarishId: string;
  listPrice: number;
  salePrice: number;
  currency: string;
  isOnSale: boolean;
  pdpType: string;
}

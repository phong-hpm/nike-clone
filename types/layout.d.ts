declare interface ILayout {
  uid: string;
  pageTitle: string;
  gridList: ILayoutItem[];
}

declare interface ILayoutItem {
  uid: string;
  mode: "grid" | "row" | "col" | "block";
  detail: ILayoutItemDetail;
  // childrens
  rowList?: ILayoutItem[];
  colList?: ILayoutItem[];
  blockList?: ILayoutItem[];
  card: ILayoutCard;
}

declare interface ILayoutItemDetail {
  id: string;
  attributes: {
    fluid: boolean;
    margin?: {
      top?: { mobile: number; desktop: number };
      left?: { mobile: number; desktop: number };
      bottom?: { mobile: number; desktop: number };
      right?: { mobile: number; desktop: number };
    };
  };
  mode: "grid" | "row" | "col" | "block";
  display?: { small: boolean; medium: boolean; large: boolean };
  data?: string;
  span: { small: number; large: number; medium: number };
}

declare interface ILayoutCard {
  uid: string;
  detail: ILayoutCardDetail;
}

declare interface ILayoutCardDetail {
  id: string;
  containerType:
    | "snkrs_drops"
    | "external_collection"
    | "section_headline"
    | "section_headline"
    | "filmstrip"
    | "merch_menu"
    | "video"
    | "image"
    | "page";
  destinationType: "gridwall" | "page" | "url";
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
  colorTheme: "dark" | "light";
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
  }[];
  slides: ILayoutCardDetailSlide[] | ILayoutCardDetail[];
  slidesUpcoming: ILayoutCardDetailSlide[] | ILayoutCard[];
  loop: boolean;
  autoPlay: boolean;
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

declare interface ICategory {
  uid: string;
  name: string;
}

declare interface IFilterOption {
  uid: string;
  name: string;
  level: "filter" | "option";
  parentUid?: string;
  options?: IFilterOption[];
}

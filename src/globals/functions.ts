import classNames from "classnames";

const _global = global as any;
_global.mapClasses = classNames;
_global.mapImageSrc = (id: string, imgName: string, quality: number) =>
  `https://static.nike.com/a/images/t_prod/w_${quality},c_limit,f_auto,q_auto/${id}/${imgName}`;

export {};

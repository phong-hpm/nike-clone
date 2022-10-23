/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { SVGProps } from "react";

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      className="pre-nav-design-icon"
      focusable="false"
      viewBox="0 0 24 24"
      role="img"
      width="24px"
      height="24px"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M14.25 3.75C13.01 3.75 12 4.76 12 6.5v7m8.25-3.75H3.75"
      ></path>
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M14.25 3.75h4.39l1.61 6v10.5H3.75V9.75l1.61-6h5.14"
      ></path>
    </svg>
  );
};

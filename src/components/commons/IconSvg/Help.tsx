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
        d="M12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75zM11.99 18v-1.5"
      ></path>
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M9 9.75a3 3 0 114.29 2.71c-.78.37-1.29 1.16-1.29 2.03V15"
      ></path>
    </svg>
  );
};

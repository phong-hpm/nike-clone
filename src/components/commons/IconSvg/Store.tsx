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
        d="M20.25 5.25V16.5c0 1.24-1.01 2.25-2.25 2.25H6c-1.24 0-2.25-1.01-2.25-2.25V5.25"
      ></path>
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M8.25 18.5v-7.25h7.5v7.25M12 11.25v7.25M1.5 5.25h21"
      ></path>
    </svg>
  );
};

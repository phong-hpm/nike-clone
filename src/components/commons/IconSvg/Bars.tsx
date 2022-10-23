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
      <path stroke="currentColor" strokeWidth="1.5" d="M21 5.25H3M21 12H3m18 6.75H3"></path>
    </svg>
  );
};

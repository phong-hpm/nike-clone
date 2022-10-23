/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { SVGProps } from "react";

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="#111" viewBox="0 0 24 24" width={24} height={24} {...props}>
      <path d="M12 0C9.813 0 7.8.533 5.96 1.6A11.793 11.793 0 0 0 1.6 5.96C.533 7.8 0 9.813 0 12s.533 4.2 1.6 6.04a11.793 11.793 0 0 0 4.36 4.36C7.8 23.467 9.813 24 12 24s4.2-.533 6.04-1.6a11.793 11.793 0 0 0 4.36-4.36C23.467 16.2 24 14.187 24 12s-.533-4.2-1.6-6.04a11.793 11.793 0 0 0-4.36-4.36C16.2.533 14.187 0 12 0zm5.2 15.28l-1.92 1.92L12 13.84 8.72 17.2 6.8 15.28 10.16 12 6.8 8.72 8.72 6.8 12 10.08l3.28-3.28 1.92 1.92L13.92 12l3.28 3.28z"></path>
    </svg>
  );
};

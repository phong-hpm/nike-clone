import { FC } from "react";

// components
import { IconSvg } from "@root/components/commons";

const HeaderSub: FC = () => {
  return (
    <div className="relative z-1000 bg-neutral-100 page-spacing py-[6px]">
      <div className="flex justify-between items-center">
        {/* logo */}
        <IconSvg icon="logo-jordan" />

        {/* actions */}
        <div className="flex justify-end">
          <p className="text-xs font-medium px-3">Help</p>
          <div className="bg-black w-[1px]" />
          <p className="text-xs font-medium px-3">Join Us</p>
          <div className="bg-black w-[1px]" />
          <p className="text-xs font-medium pl-3">Sign In</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSub;

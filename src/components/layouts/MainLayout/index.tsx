import { FC, ReactNode } from "react";

// components
import { IconSvg } from "../../commons";
import Navigation from "./Navigation";

export interface MainLayoutProps {
  navigations: INavigation[];
  onNavigation: () => void;
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ navigations, onNavigation, children }) => {
  return (
    <div className="flex flex-col">
      {/* header */}
      <div className="bg-neutral-100 page-spacing py-[6px]">
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

      <div className="relative h-15 page-spacing">
        <div className="flex justify-between">
          {/* logo */}
          <div className="">
            <IconSvg icon="logo-nike" />
          </div>

          {/* navigations */}
          <Navigation navigations={navigations} onNavigation={onNavigation} />

          {/* actions */}
          <div></div>
        </div>
      </div>

      {/* banner */}
      <div className="bg-gray-100 h-15 page-spacing mb-3"></div>

      {children}
    </div>
  );
};

export default MainLayout;

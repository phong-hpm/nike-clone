import { FC, ReactNode } from "react";

// components
import { NavigationProvider } from "@root/components/features";
import Header from "./Header";
import HeaderSub from "./HeaderSub";

export interface MainLayoutProps {
  navigationList: INavigation[];
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ navigationList, children }) => {
  return (
    <NavigationProvider>
      <div className="flex flex-col">
        <HeaderSub />
        <Header navigationList={navigationList} />

        {/* banner */}
        <div className="h-15 page-spacing mb-3"></div>

        <div id="body">{children}</div>
      </div>
    </NavigationProvider>
  );
};

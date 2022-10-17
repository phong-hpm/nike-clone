import { FC, ReactNode } from "react";

// components
import NavigationProvider from "../../main/NavigationContext";
import Header from "./Header";
import HeaderSub from "./HeaderSub";

export interface MainLayoutProps {
  navigationList: INavigation[];
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ navigationList, children }) => {
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

export default MainLayout;

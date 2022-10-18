import { FC, ReactNode } from "react";
import Head from "next/head";

// components
import { NavigationProvider } from "@root/components/features";
import Header from "./Header";
import HeaderSub from "./HeaderSub";

export interface MainLayoutProps {
  title: string;
  navigationList: INavigation[];
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ title, navigationList, children }) => {
  return (
    <NavigationProvider>
      <Head>
        <title>{title}. Nike</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

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

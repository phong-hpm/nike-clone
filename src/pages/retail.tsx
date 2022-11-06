import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";

// components
import { MainLayout } from "@root/components/layouts";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@root/components/commons";
import { SomethingWentWrong } from "@root/components/features/SomethingWentWrong";

// modules
import RetailMap from "@root/modules/retail/RetailMap";
import RetailSearch from "@root/modules/retail/RetailSearch";
import RetailList from "@root/modules/retail/RetailList";

// utils
import { apiHandlers, withServerSidePropDebugger } from "@root/utils";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";
import RetailProvider from "@root/modules/retail/RetailContext";

export interface RetailPageProps {
  retailList: IRetail[];
  navigationList: INavigation[];
}

const RetailPage: NextPage<RetailPageProps> = ({ retailList, navigationList }) => {
  const isScreenLG = useMediaScreen("lg");

  const [selectedTab, setSelectedTab] = useState(0);

  if (!retailList?.length) return <SomethingWentWrong navigationList={navigationList} />;

  // waiting for [useMediaScreen] get window's width
  if (isScreenLG === undefined) return <></>;

  return (
    <MainLayout hideBanner title="Find Your Neatest Store" navigationList={navigationList}>
      <RetailProvider retailList={retailList}>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:h-[80vh] lg:basis-96 shrink grow-0">
            <RetailSearch />

            {!isScreenLG && (
              <Tabs selected={selectedTab} onChangeTab={setSelectedTab}>
                <TabList className="px-8">
                  <Tab>List</Tab>
                  <Tab>Map</Tab>
                </TabList>
              </Tabs>
            )}

            {(isScreenLG || selectedTab === 0) && <RetailList />}
          </div>

          <div className="basis-[66%] shrink-0 grow-2">
            <div className={cls(!isScreenLG && selectedTab !== 1 && "invisible !h-0")}>
              <RetailMap />
            </div>
          </div>
        </div>
      </RetailProvider>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withServerSidePropDebugger(async () => {
  const [navigationList, { retailList }] = await Promise.all([
    apiHandlers.getNavigationList(),
    apiHandlers.getRetails(),
  ]);

  return { props: { navigationList, retailList } };
});

export default RetailPage;

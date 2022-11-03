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

  if (!retailList?.length) return <SomethingWentWrong navigationList={navigationList} />;

  // waiting for [useMediaScreen] get window's width
  if (isScreenLG === undefined) return <></>;

  return (
    <MainLayout hideBanner title="Find Your Neatest Store" navigationList={navigationList}>
      <RetailProvider retailList={retailList}>
        {isScreenLG && (
          <div className="flex">
            <div className="basis-96 shrink grow-0 h-[80vh]">
              <RetailSearch />
              <RetailList />
            </div>

            <div className="basis-[66%] shrink-0 grow-2 h-[80vh]">
              <RetailMap />
            </div>
          </div>
        )}

        {!isScreenLG && (
          <>
            <RetailSearch />
            <Tabs>
              <TabList className="px-6">
                <Tab>Map</Tab>
                <Tab>List</Tab>
              </TabList>

              <TabPanels>
                <TabPanel className="w-full h-[80vh]">
                  <RetailMap />
                </TabPanel>
                <TabPanel className="w-full h-[80vh]">
                  <RetailList />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
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

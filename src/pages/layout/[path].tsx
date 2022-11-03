import { GetServerSideProps, NextPage } from "next";

// components
import { MainLayout } from "@root/components/layouts";

// utils
import { apiHandlers, withServerSidePropDebugger } from "@root/utils";

// components
import { PageContentLayout } from "@root/components/layouts";
import { SomethingWentWrong } from "@root/components/features/SomethingWentWrong";

export interface LayoutPageProps {
  navigationList: INavigation[];
  layout: ILayout;
  layoutItemList: ILayoutItem[];
}

const LayoutPage: NextPage<LayoutPageProps> = ({ navigationList, layout, layoutItemList }) => {
  if (!layoutItemList?.length) {
    return <SomethingWentWrong navigationList={navigationList} />;
  }

  return (
    <MainLayout title={layout.pageTitle} navigationList={navigationList}>
      <PageContentLayout layout={layout} layoutItemList={layoutItemList} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withServerSidePropDebugger(async (req) => {
  const { path } = req.query;

  const [{ layout, layoutItemList }, navigationList] = await Promise.all([
    apiHandlers.getLayout(`/${path}`),
    apiHandlers.getNavigationList(),
  ]);

  return { props: { navigationList, layout, layoutItemList } };
});

export default LayoutPage;

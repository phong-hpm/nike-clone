import { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";

// components
import { MainLayout } from "@root/components/layouts";

// utils
import { apiHandlers } from "@root/utils";

// components
import { PageContentLayout } from "@root/components/layouts";

export interface HomePageProps {
  navigationList: INavigation[];
  layout: ILayout;
}

const HomePage: NextPage<HomePageProps> = ({ navigationList, layout }) => {
  console.clear();
  // console.table(
  //   Object.values(layout.cards).map(
  //     ({ containerType, destinationType, title, titleProps, subtitleProps, sectionHeadline }) => ({
  //       containerType,
  //       destinationType,
  //       title: title,
  //       titleProps: titleProps?.text,
  //       subtitleProps: subtitleProps?.text,
  //       sectionHeadline: sectionHeadline?.title,
  //     })
  //   )
  // );

  // const pageData = useMemo(() => layout.pageData, [layout.pageData]);
  // const layoutId = useMemo(() => pageData.layout, [pageData]);
  // const layout = useMemo(() => layout.layout[layoutId], [layout, layoutId]);
  // const layoutItemMap = useMemo(() => layout.layoutItems, [layout.layoutItems]);
  // const layoutCardMap = useMemo(() => layout.cards, [layout.cards]);

  return (
    <MainLayout title={layout.pageTitle} navigationList={navigationList}>
      <div className="page-spacing">
        <PageContentLayout layout={layout} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [navigationList, layout] = await Promise.all([
    apiHandlers.getNavigationList(),
    apiHandlers.getLayout("70a79d93-e8f1-4fe2-923d-cba0d4b32985"),
  ]);

  return { props: { navigationList, layout } };
};

export default HomePage;

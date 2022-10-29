import { FC } from "react";
import { MainLayout } from "../layouts";

export interface SomethingWentWrongProps {
  navigationList: INavigation[];
}

export const SomethingWentWrong: FC<SomethingWentWrongProps> = ({ navigationList }) => {
  return (
    <MainLayout title="404" navigationList={navigationList}>
      <div className="flex justify-center text-2xl text-gray-main h-32">Something Went Wrong</div>
    </MainLayout>
  );
};

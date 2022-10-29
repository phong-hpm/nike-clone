import { NextPage } from "next";

// components
import { SomethingWentWrong } from "@root/components/features/SomethingWentWrong";

const NotFoundPage: NextPage = () => {
  return <SomethingWentWrong navigationList={[]} />;
};

export default NotFoundPage;

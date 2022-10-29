import { GetServerSideProps, NextPage } from "next";

// components
import { MainLayout } from "@root/components/layouts";

export interface CartProps {}

const Cart: NextPage<CartProps> = ({}) => {
  return (
    <MainLayout title="Nike Store. Bag" navigationList={[]}>
      <p>Cart</p>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Cart;

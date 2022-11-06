import { FC } from "react";
import { useRouter } from "next/router";

// components
import { Button, Collapse } from "@root/components/commons";
import Text from "../Text";
import ScreenShotImage from "../ScreenShotImage";

export interface ProductTabProps {
  onClose: () => void;
}

const ProductTab: FC<ProductTabProps> = ({ onClose }) => {
  const router = useRouter();

  return (
    <div>
      <div className="font-light py-3">
        <p>
          <Text h>Product</Text>feature is a<Text b>fixed UI</Text>, which is always display the
          same layout for all data
        </p>

        <p>
          All the most of behaviors were built in the same with
          <Text u>https://nike.com/gb</Text>. However, a few behaviors were changed to make better
          UX/UI like:
        </p>

        <ul className="list-disc pl-4">
          <li>
            <Text b>Query products at client-side:</Text> reduce the data's size from server-side,
            allow to apply
            <Text h>react-loading-skeleton</Text>
          </li>
          <li>
            <Text b>Query products asynchronous:</Text> Products api will be call while NextJS is
            waiting for <Text h>getServerSideProps</Text>
          </li>
        </ul>

        <p>
          <Text b>Strongly focus points:</Text> handling animations, optimizing performance,
          structuring data, reusable and maintainable
        </p>

        <p>
          <Text b>Status:</Text> Complete
        </p>
      </div>

      <div className="pb-3">
        <Button
          variant="contain"
          className="w-auto"
          onClick={() => {
            router.push("/p/men-shoes-all-shoes/qjr7qk76zM/81BXZO1Df5VPPWRR4TVz");
            onClose();
          }}
        >
          Quick access
        </Button>
      </div>

      <Collapse label="Navigate to">
        <ul className="list-disc pl-4">
          <li>
            <p>
              <span className="text-gray-main ml-1">Click navigation items in navigation bar</span>
            </p>
            <ScreenShotImage src="product/navigation-1.png" />
          </li>
        </ul>
      </Collapse>

      <Collapse label="Screenshots">
        <div className="grid gap-2">
          <ScreenShotImage src="product/screenshot-1.png" />
          <ScreenShotImage src="product/screenshot-2.png" />
          <div className="grid grid-cols-2 gap-4">
            <ScreenShotImage src="product/screenshot-mobile-1.png" />
            <ScreenShotImage src="product/screenshot-mobile-2.png" />
            <ScreenShotImage src="product/screenshot-mobile-3.png" />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default ProductTab;

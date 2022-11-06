import { FC } from "react";
import { useRouter } from "next/router";

// components
import { Button, Collapse } from "@root/components/commons";
import Text from "../Text";
import ScreenShotImage from "../ScreenShotImage";

export interface ProductDetailTabProps {
  onClose: () => void;
}

const ProductDetailTab: FC<ProductDetailTabProps> = ({ onClose }) => {
  const router = useRouter();

  return (
    <div>
      <div className="font-light py-3">
        <p>
          <Text h>Product Detail</Text>feature is not only <Text b>fixed UI</Text>, but also
          <Text b>flexible UI</Text>
        </p>

        <p>
          <Text h>Product Detail</Text> displays product's image via <Text b>"nodes"</Text>.
        </p>

        <p>
          <Text h>Layout</Text> allow to manage directly the layout without update source code. The
          page can has many dinamic layouts but use only one source code
        </p>

        <p>
          <Text b>Status:</Text> Complete
        </p>

        <p>
          Because of the limited disk-space in VPS, there are only <Text b>one record</Text>
          <Text h>product_detail</Text> in database.
        </p>
        <p>
          Check <Text h>Data Structures</Text> for more informations
        </p>

        <p>
          <Text b>Strongly focus points:</Text> structuring data, reusable and maintainable
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
            router.push("/d/CU4495-010");
            onClose();
          }}
        >
          Quick access
        </Button>
      </div>

      <Collapse label="Navigate to">
        <ul className="list-disc pl-4">
          <li>
            <ScreenShotImage src="product-detail/navigation-1.png" />
          </li>
        </ul>
      </Collapse>

      <Collapse label="Screenshots">
        <div className="grid gap-2">
          <ScreenShotImage src="product-detail/screenshot-1.png" />
          <ScreenShotImage src="product-detail/screenshot-2.png" />
          <ScreenShotImage src="product-detail/screenshot-3.png" />
          <ScreenShotImage src="product-detail/screenshot-4.png" />
          <div className="grid grid-cols-2 gap-4">
            <ScreenShotImage src="product-detail/screenshot-mobile-1.png" />
            <ScreenShotImage src="product-detail/screenshot-mobile-2.png" />
            <ScreenShotImage src="product-detail/screenshot-mobile-3.png" />
            <ScreenShotImage src="product-detail/screenshot-mobile-4.png" />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default ProductDetailTab;

import { FC } from "react";
import { useRouter } from "next/router";

// components
import { Button, Collapse } from "@root/components/commons";
import Text from "../Text";
import ScreenShotImage from "../ScreenShotImage";

export interface LayoutTabProps {
  onClose: () => void;
}

const LayoutTab: FC<LayoutTabProps> = ({ onClose }) => {
  const router = useRouter();

  return (
    <div>
      <div className="font-light py-3">
        <p>
          Don't the same as<Text h>Product</Text>feature,<Text h>Layout</Text> is a
          <Text b>flexible UI</Text>, which uses data from api to config the layout.
        </p>
        <p>
          <Text h>Layout</Text> allow to manage directly the layout without update source code. The
          page can has many dinamic layouts but use only one source code
        </p>
        <p>
          <Text b>Status:</Text> Complete
        </p>
        <p>
          <Text b>Product layers:</Text> Grid, Row, Column, Block, Card
        </p>
        <p>
          Check <Text h>Data Structures</Text> for more informations
        </p>
      </div>

      <div className="pb-3">
        <Button
          variant="contain"
          className="w-auto"
          onClick={() => {
            router.push("/men");
            onClose();
          }}
        >
          Quick access
        </Button>
      </div>

      <Collapse label="Navigate to">
        <ul className="list-disc pl-4">
          <li>
            Click the <Text b>nike Logo</Text>, or a few navigation items in navigation bar
            <ScreenShotImage src="layout/navigation-1.png" />
          </li>
        </ul>
      </Collapse>

      <Collapse label="Data Structures">
        <p className="mb-4">
          <Text b>Data source:</Text>
          <Text u>https://nike.com/gb</Text>
        </p>

        <Text h b text="layouts" />
        <ul className="list-disc pl-6 mb-4">
          <li>
            <Text h>pageUrlPaths</Text>: the path of page url
          </li>
          <li>
            <Text h>detail</Text>:
            <ul className="list-disc pl-6">
              <li>
                <Text h>mode</Text>: 'layout'
              </li>
              <li>
                <Text h>items</Text>: the list of
                <Text h>Grid</Text>'s uid. Each<Text h>items</Text>is a part of page
              </li>
              <li>
                <Text h>...the rest fields</Text>: configs of
                <Text h>layout</Text>
              </li>
            </ul>
          </li>
        </ul>

        <Text h b text="layout_items" />
        <ul className="list-disc pl-6 mb-4">
          <li>
            <Text h>mode</Text>: 'grid | row | col | block'
          </li>
          <li>
            <Text h>layoutCardUid</Text>: <Text h>Card</Text>'s uid. Only have value in
            <Text h>Block</Text>items
          </li>
          <li>
            <Text h>detail</Text>:
            <ul className="list-disc pl-6">
              <li>
                <Text h>items</Text>: the list of
                <Text h>Row | Col | Block</Text>'s uid. They are the nested child
              </li>
              <li>
                <Text h>data</Text>: the<Text h>Card</Text>'s uid.
              </li>
              <li>
                <Text h>...the rest fields</Text>: configs of
                <Text h>layout_item</Text>
              </li>
            </ul>
          </li>
        </ul>

        <Text h b text="layout_cards" />
        <ul className="list-disc pl-6 mb-4">
          <li>
            <Text h>detail</Text>:
            <ul className="list-disc pl-6">
              <li>
                <Text h>containerType</Text>: the kind of
                <Text h>Card</Text>'s layout
              </li>
              <li>
                <Text h>actionButtons</Text>: the list of buttons will be display in
                <Text h>Card</Text>
              </li>
              <li>
                <Text h>titleProps</Text>: configs of<Text h>Card</Text>
                title
              </li>
              <li>
                <Text h>subtitleProps</Text>: configs of
                <Text h>Card</Text>
                sub title
              </li>
              <li>
                <Text h>bodyProps</Text>: configs of<Text h>Card</Text>
                body
              </li>
              <li>
                <Text h>textLocation</Text>: configs of text's layer in
                <Text h>Card</Text>
              </li>
              <li>
                <Text h>...the rest fields</Text>: configs of
                <Text h>layout_card</Text>
              </li>
            </ul>
          </li>
        </ul>
      </Collapse>

      <Collapse label="Screenshots">
        <div className="grid gap-2">
          <ScreenShotImage src="layout/screenshot-1.png" />
          <ScreenShotImage src="layout/screenshot-2.png" />
          <ScreenShotImage src="layout/screenshot-3.png" />
          <ScreenShotImage src="layout/screenshot-4.png" />
          <ScreenShotImage src="layout/screenshot-5.png" />
          <ScreenShotImage src="layout/screenshot-6.png" />
        </div>
      </Collapse>
    </div>
  );
};

export default LayoutTab;

import { FC } from "react";
import { useRouter } from "next/router";

// components
import { Button, Collapse } from "@root/components/commons";
import Text from "../Text";
import ScreenShotImage from "../ScreenShotImage";

export interface RetailMapTabProps {
  onClose: () => void;
}

const RetailMapTab: FC<RetailMapTabProps> = ({ onClose }) => {
  const router = useRouter();

  return (
    <div>
      <div className="font-light py-3">
        <p></p>

        <p>
          <Text b>Strongly focus points:</Text> optimizing performance
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
            router.push("/retail");
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
              Click the <Text b>Find a Store</Text> button at the top-right corner
            </p>
            <ScreenShotImage src="retail-map/navigation-1.png" />
          </li>
          <li className="mt-4">
            <p>
              Click the <Text b>Find a Store</Text> button at the the end of navigation bar modal
            </p>
            <div className="grid grid-cols-2 gap-2">
              <ScreenShotImage src="retail-map/navigation-2.png" />
            </div>
          </li>
        </ul>
      </Collapse>

      <Collapse label="Work flows">
        <p>
          <Text b>Data source:</Text>
          <Text u>https://nike.com/gb</Text>,<Text u>https://nominatim.openstreetmap.org</Text>
        </p>

        <Text b>Main flows:</Text>
        <ul className="list-disc pl-4">
          <li className="mb-2">
            <Text b>Load page:</Text>
            <ul className="list-decimal pl-4">
              <li>
                Load all<Text h>retail's coordinates</Text>
                from api (without detail)
              </li>
              <li>
                Filter limitedly the<Text h>closest retails</Text>with user's location
              </li>
              <li>
                Get the detail of<Text h>closest retails</Text>from api
              </li>
              <li>Display them on the screen</li>
            </ul>
          </li>

          <li className="mb-2">
            <Text b>Search:</Text>
            <ul className="list-decimal pl-4">
              <li>
                <span>Get place list from</span>
                <Text u>https://nominatim.openstreetmap.org</Text>
                api, pick the first one as <Text h>search center</Text>
              </li>
              <li>
                Get all <Text h>closest retail</Text> with <Text h>search center</Text>
              </li>
              <li>Display them on the screen</li>
            </ul>
          </li>

          <li>
            <Text b>Select a searched point:</Text>
            <ul className="list-decimal pl-4">
              <li>
                Pick selected point from place list as<Text h>search center</Text>
              </li>
              <li>
                Get all <Text h>closest retail</Text> with <Text h>search center</Text>
              </li>
              <li>Display them on the screen</li>
            </ul>
          </li>
        </ul>
      </Collapse>

      <Collapse label="Screenshots">
        <div className="grid gap-2">
          <ScreenShotImage src="retail-map/screenshot-1.png" />
          <ScreenShotImage src="retail-map/screenshot-2.png" />
          <div className="grid grid-cols-2 gap-2">
            <ScreenShotImage src="retail-map/screenshot-mobile-1.png" />
            <ScreenShotImage src="retail-map/screenshot-mobile-2.png" />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default RetailMapTab;

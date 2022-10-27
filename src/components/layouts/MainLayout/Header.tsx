import { FC, useEffect, useState } from "react";

// components
import { IconSvg, ButtonIcon, AutoFixed } from "@root/components/commons";
import Navigation from "./Navigation";
import useMediaScreen from "@root/hooks/useMediaScreen";
import NavigationModal from "./Navigation/NavigationModal";

// custom hooks
import { useNavigation } from "@root/hooks";

export interface HeaderProps {
  navigationList: INavigation[];
}

const Header: FC<HeaderProps> = ({ navigationList }) => {
  const { navigate } = useNavigation();
  const isScreenLG = useMediaScreen("lg");

  const [isShowNavModal, setShowNavModal] = useState(false);

  // auto close modal when screen was changed to be "LG"
  useEffect(() => {
    if (isScreenLG) setShowNavModal(false);
  }, [isScreenLG]);

  return (
    <div className="h-15">
      <AutoFixed autoHide>
        <div className="relative flex items-end transition-height h-15 page-spacing bg-white">
          <div className="flex grow">
            <div className="grow-0 basis-[150px]">
              <IconSvg icon="logo-nike" className="cursor-pointer" onClick={() => navigate("/")} />
            </div>

            <div className="grow flex justify-center">
              <Navigation navigationList={navigationList} />
            </div>

            <div className="grow-0 basis-[150px] flex justify-end items-center mr-[-6px] gap-3">
              <ButtonIcon>
                <IconSvg icon="search" />
              </ButtonIcon>
              <ButtonIcon className="hidden lg:!block">
                <IconSvg icon="favourite" />
              </ButtonIcon>
              <ButtonIcon>
                <IconSvg icon="cart" />
              </ButtonIcon>
              <ButtonIcon
                className="block lg:hidden"
                disabled={isScreenLG}
                onClick={() => setShowNavModal(true)}
              >
                <IconSvg icon="bars" />
              </ButtonIcon>
            </div>

            <NavigationModal
              isShow={isShowNavModal}
              navigationList={navigationList}
              onHide={() => setShowNavModal(false)}
            />
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

export default Header;

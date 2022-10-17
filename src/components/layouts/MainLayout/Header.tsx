import { FC } from "react";

// components
import { IconSvg, ButtonIcon, AutoFixed } from "@root/components/commons";
import Navigation from "./Navigation";

export interface HeaderProps {
  navigationList: INavigation[];
}

const Header: FC<HeaderProps> = ({ navigationList }) => {
  return (
    <div className="h-15">
      <AutoFixed autoHide>
        <div className="relative flex items-end transition-height h-15 page-spacing bg-white">
          <div className="flex grow">
            <div className="grow-0 basis-[150px]">
              <IconSvg icon="logo-nike" />
            </div>

            <div className="grow flex justify-center">
              <Navigation navigationList={navigationList} />
            </div>

            <div className="grow-0 basis-[150px] flex justify-end items-center mr-[-6px]">
              <ButtonIcon className="mr-3">
                <IconSvg icon="search" />
              </ButtonIcon>
              <ButtonIcon className="mr-3">
                <IconSvg icon="favourite" />
              </ButtonIcon>
              <ButtonIcon>
                <IconSvg icon="cart" />
              </ButtonIcon>
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

export default Header;

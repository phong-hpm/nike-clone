import { FC, ReactNode, useState } from "react";

// components
import {
  IconSvg,
  Modal,
  ModalBody,
  ModalHeader,
  SliderContainer,
  Slider,
  Button,
} from "@root/components/commons";
import NavigationLink from "./NavigationLink";
import { useRouter } from "next/router";

export interface SliderProps {
  activeIndex: number;
  title?: string;
  backTitle?: string;
  className?: string;
  children: ReactNode;
  onBack?: () => void;
}

export interface NavigationModalProps {
  isShow: boolean;
  onHide: () => void;
  navigationList: INavigation[];
}

const NavigationModal: FC<NavigationModalProps> = ({ isShow, navigationList, onHide }) => {
  const router = useRouter();

  const [selectedNav, setSelectedNav] = useState<INavigation>();
  const [selectedGroup, setSelectedGroup] = useState<INavigation>();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleBack = () => setActiveSlide(activeSlide - 1);

  const handleNext = () => setActiveSlide(activeSlide + 1);

  const handleClickNav = (nav: INavigation) => {
    setSelectedNav(nav);
    handleNext();
  };

  const handleClickGroup = (nav: INavigation) => {
    setSelectedGroup(nav);
    handleNext();
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    onHide?.();
  };

  return (
    <Modal
      isShow={isShow}
      position="right"
      animation="slide-right"
      onHide={onHide}
      contentClass="w-80"
      afterHide={() => setActiveSlide(0)}
    >
      <ModalHeader className="px-4" />

      <ModalBody className="!px-0">
        <SliderContainer>
          <Slider activeIndex={activeSlide}>
            <div className="mb-8">
              {navigationList.map((nav) => {
                return (
                  <div
                    key={nav.uid}
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => handleClickNav(nav)}
                  >
                    <p className="text-2xl font-medium">{nav.label}</p>
                    <IconSvg icon="arrow" className="arrow-right thin" />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center mb-8 cursor-pointer">
              <IconSvg icon="logo-jordan" width={30} height={30} />
              <p className="ml-4 font-medium">Jordan</p>
            </div>

            <div className="mb-4">
              <p className="text-xl font-medium text-gray-main">
                Become a Nike Member for the best products, inspiration and stories in sport.
                <span
                  className="text-black ml-1 cursor-pointer"
                  onClick={() => router.push("/membership")}
                >
                  Learn more
                </span>
              </p>
            </div>

            <div className="flex mb-8">
              <Button variant="contain" className="!w-auto">
                Join Us
              </Button>
              <Button variant="outline" className="!w-auto ml-2">
                Sign In
              </Button>
            </div>

            <div>
              <div className="flex py-1 mb-3 cursor-pointer">
                <IconSvg icon="orders" />
                <p className="font-medium ml-3">Orders</p>
              </div>
              <div
                className="flex py-1 mb-3 cursor-pointer"
                onClick={() => handleNavigate("/retail")}
              >
                <IconSvg icon="store" />
                <p className="font-medium ml-3">Find a Store</p>
              </div>
              <div className="flex py-1 cursor-pointer">
                <IconSvg icon="help" />
                <p className="font-medium ml-3">Help</p>
              </div>
            </div>
          </Slider>

          <Slider
            activeIndex={activeSlide}
            title={selectedNav?.label}
            backTitle="All"
            onBack={handleBack}
          >
            {selectedNav?.childrenList?.map((group) => {
              return (
                <div
                  key={group.uid}
                  className="flex justify-between py-1 cursor-pointer"
                  onClick={() => handleClickGroup(group)}
                >
                  <p className="text-gray-main">{group.label}</p>
                  <IconSvg icon="arrow" className="arrow-right thin !border-gray-main" />
                </div>
              );
            })}
          </Slider>

          <Slider
            activeIndex={activeSlide}
            title={selectedGroup?.label}
            backTitle={selectedNav?.label}
            onBack={handleBack}
          >
            {selectedGroup?.childrenList?.map((navLink) => (
              <NavigationLink
                key={navLink.uid}
                navigation={navLink}
                className="!font-normal text-gray-main py-1"
                onClick={onHide}
              />
            ))}
          </Slider>
        </SliderContainer>
      </ModalBody>
    </Modal>
  );
};

export default NavigationModal;

import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@root/components/commons";

// components
import RetailMapTab from "./Tabs/RetailMapTab";
import LayoutTab from "./Tabs/LayoutTab";
import ProductTab from "./Tabs/ProductTab";
import ProductDetailTab from "./Tabs/ProductDetailTab";

const ProjectDescription = () => {
  const [isShowModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="fixed z-1000 bottom-6 right-6">
        <div className="relative">
          <div
            className={cls(
              "absolute z-[-1] bottom-1 right-2 w-16 h-6",
              "rounded-full bg-green-700 animate-ping"
            )}
          />
          <div
            className={cls(
              "flex items-center h-8 w-20",
              "bg-green-600 rounded-full cursor-pointer shadow-custom"
            )}
            onClick={() => setShowModal(true)}
          >
            <p className="w-full text-xs text-white font-medium text-center">README</p>
          </div>
        </div>
      </div>

      <Modal isShow={isShowModal} onHide={() => setShowModal(false)} contentClass="h-[90vh]">
        <ModalHeader>Project Features</ModalHeader>
        <ModalBody className="!overflow-y-scroll custom-scroll-bar">
          <div className="py-4">
            <Tabs>
              <TabList>
                <Tab>Products</Tab>
                <Tab>Layout</Tab>
                <Tab>Product Detail</Tab>
                <Tab>Retail Map</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ProductTab onClose={() => setShowModal(false)} />
                </TabPanel>
                <TabPanel>
                  <LayoutTab onClose={() => setShowModal(false)} />
                </TabPanel>
                <TabPanel>
                  <ProductDetailTab onClose={() => setShowModal(false)} />
                </TabPanel>
                <TabPanel>
                  <RetailMapTab onClose={() => setShowModal(false)} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectDescription;

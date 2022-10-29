import { FC } from "react";

// components
import { Collapse } from "@root/components/commons";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

export interface LayoutCardMergeMenuProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardMergeMenu: FC<LayoutCardMergeMenuProps> = ({ layoutCardDetail }) => {
  const isScreenMD = useMediaScreen("md");

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:gap-4 bg-white">
      {layoutCardDetail.items?.map(({ id, label, links }) => {
        return (
          <div key={id} className="flex flex-col gap-8">
            <Collapse
              noBorder
              toggleable={!isScreenMD}
              label={label}
              icon={<></>}
              contentClass="pl-8 md:pl-0"
            >
              {links.map((link) => {
                return (
                  <div key={link.id} className="py-1.5">
                    <p className="text-gray-main hover:text-black cursor-pointer font-medium">
                      {link.label}
                    </p>
                  </div>
                );
              })}
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

export default LayoutCardMergeMenu;

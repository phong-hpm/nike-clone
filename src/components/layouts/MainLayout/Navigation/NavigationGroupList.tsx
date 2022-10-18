import { FC } from "react";

// components
import NavigationLink from "./NavigationLink";

export interface NavigationGroupListProps {
  isShow: boolean;
  navigationList: INavigation[];
}

const NavigationGroupList: FC<NavigationGroupListProps> = ({ isShow, navigationList }) => {
  return (
    <div
      className={mapClasses(
        "absolute z-50 top-full left-0 flex justify-center w-full bg-white",
        isShow && "transition-padding pt-4"
      )}
    >
      {isShow && (
        <div className="flex justify-center w-4/5 pb-10 fade-in">
          {navigationList.map((navGroup) => (
            <div key={navGroup.uid} className="w-1/6 px-2 py-4">
              <NavigationLink key={navGroup.uid} navigation={navGroup} />

              {/* links */}
              <div className="pt-4">
                {(navGroup.childrenList || []).map((navLink) => (
                  <NavigationLink
                    key={navLink.uid}
                    navigation={navLink}
                    className="font-regular text-gray-main hover:text-black mb-2 text-sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationGroupList;

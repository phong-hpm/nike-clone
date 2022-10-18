import React, { FC, useEffect, useState } from "react";

// custom hooks
import { useNavigation } from "@root/hooks";

// components
import NavigationLink from "./NavigationLink";
import NavigationGroupList from "./NavigationGroupList";

export interface NavigationProps {
  navigationList: INavigation[];
}

const Navigation: FC<NavigationProps> = ({ navigationList }) => {
  const { navigating } = useNavigation();

  const [hoveredUid, setHoveredUid] = useState("");

  // remove [hoveredUid] when navigating to close the dropdown
  useEffect(() => {
    navigating && setHoveredUid("");
  }, [navigating]);

  return (
    <div className="flex">
      {navigationList.map((nav) => {
        const isHovered = hoveredUid === nav.uid && !!nav.childrenList?.length;

        return (
          <div
            key={nav.uid}
            onMouseEnter={() => setHoveredUid(nav.uid)}
            onMouseLeave={() => setHoveredUid("")}
          >
            <NavigationLink
              key={nav.uid}
              navigation={nav}
              className="px-3 py-4 border-b-2 border-transparent hover:border-b-black"
            />

            {/* backgdrop */}
            <div
              className={mapClasses(
                "absolute z-900 top-full left-0 right-0",
                "h-screen bg-black/[0.5] pointer-events-none hidden",
                isHovered && "!block"
              )}
            />

            {/* groups */}
            <NavigationGroupList navigationList={nav.childrenList || []} isShow={isHovered} />
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;

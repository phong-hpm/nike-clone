import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";

// utils
import mapNavigations from "../../../pages/products/mapNavigations";

export interface NavigationProps {
  navigations: INavigation[];
  onNavigation: () => void;
}

const Navigation: FC<NavigationProps> = ({ navigations, onNavigation }) => {
  const router = useRouter();

  const [hoveredUid, setHoveredUid] = useState("");

  const mappedNavigations = useMemo(() => mapNavigations(navigations || []), [navigations]);

  const handleNavigation = (path: string) => {
    setHoveredUid("");
    onNavigation();
    router.push(path);
  };

  return (
    <div className="flex">
      {mappedNavigations.map(({ uid: rootUid, urlPath: rootUrlPath, label: rootLabel, groups }) => {
        const isHovered = hoveredUid === rootUid;

        return (
          <div
            key={rootUid}
            className={mapClasses(
              "cursor-pointer px-3 py-4 border-b-2 border-transparent",
              isHovered && "border-b-black"
            )}
            onMouseEnter={() => setHoveredUid(rootUid)}
            onMouseLeave={() => setHoveredUid("")}
          >
            <Link href={`/products/${rootUrlPath}`}>
              <p className="font-medium">{rootLabel}</p>
            </Link>

            {/* groups */}
            <div
              className={mapClasses(
                "absolute z-50 top-full left-0 flex justify-center w-full bg-white",
                isHovered && groups.length && "transition-padding pt-4"
              )}
            >
              {isHovered && !!groups.length && (
                <div className="flex justify-center w-4/5 pb-10 fade-in">
                  {groups.map(
                    ({ uid: groupUid, urlPath: groupUrlPath, label: groupLabel, links }) => (
                      <div key={groupUid} className="w-1/6 px-2 py-4">
                        <Link href={`/products/${groupUrlPath}`}>
                          <p className="font-medium mb-4">{groupLabel}</p>
                        </Link>

                        {/* links */}
                        <div>
                          {links.map(({ uid: linkUid, urlPath: linkUrlPath, label: linkLabel }) => (
                            <div
                              key={linkUid}
                              onClick={() => handleNavigation(`/products/${linkUrlPath}`)}
                            >
                              <p className="text-gray-main hover:text-black mb-2 text-sm">
                                {linkLabel}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;

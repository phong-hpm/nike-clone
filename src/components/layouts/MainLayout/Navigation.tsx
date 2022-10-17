import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// custom hooks
import { useNavigation } from "@root/hooks";

export interface NavigationProps {
  navigationList: INavigation[];
}

const Navigation: FC<NavigationProps> = ({ navigationList }) => {
  const router = useRouter();
  const { setNavigating } = useNavigation();

  const [hoveredUid, setHoveredUid] = useState("");

  const handleNavigation = (path: string) => {
    // empty [hoveredUid] to hide dropdown
    setHoveredUid("");
    setNavigating(true);
    router.push(path);
  };

  // when [router.asPath] was changed, set navigating to be "false"
  useEffect(() => {
    setNavigating(false);
  }, [router.asPath, setNavigating]);

  const renderGroups = (groups: INavigation[] = []) => {
    return groups.map(({ uid, urlPath, label, childrenList, filterIds }) => (
      <div key={uid} className="w-1/6 px-2 py-4">
        {filterIds?.length ? (
          <Link href={`/products/${urlPath}`}>
            <p className="font-medium mb-4">{label}</p>
          </Link>
        ) : (
          <p className="font-medium mb-4">{label}</p>
        )}

        {/* links */}
        <div>{renderLinks(childrenList)}</div>
      </div>
    ));
  };

  const renderLinks = (links: INavigation[] = []) => {
    return links.map(({ uid, urlPath, label: label, filterIds }) => (
      <div key={uid} onClick={() => filterIds?.length && handleNavigation(`/products/${urlPath}`)}>
        <p className="text-gray-main hover:text-black mb-2 text-sm">{label}</p>
      </div>
    ));
  };

  return (
    <div className="flex">
      {navigationList.map(({ uid, urlPath, label, childrenList }) => {
        const isHovered = hoveredUid === uid;

        return (
          <div
            key={uid}
            className={mapClasses(
              "cursor-pointer px-3 py-4 border-b-2 border-transparent",
              isHovered && "border-b-black"
            )}
            onMouseEnter={() => setHoveredUid(uid)}
            onMouseLeave={() => setHoveredUid("")}
          >
            <Link href={`/products/${urlPath}`}>
              <p className="font-medium">{label}</p>
            </Link>

            {/* backgdrop */}
            <div
              className={mapClasses(
                "absolute z-40 top-full left-0 right-0",
                "h-screen bg-black/[0.5] pointer-events-none hidden",
                isHovered && childrenList?.length && "!block"
              )}
            />

            {/* groups */}
            <div
              className={mapClasses(
                "absolute z-50 top-full left-0 flex justify-center w-full bg-white",
                isHovered && childrenList?.length && "transition-padding pt-4"
              )}
            >
              {isHovered && !!childrenList?.length && (
                <div className="flex justify-center w-4/5 pb-10 fade-in">
                  {renderGroups(childrenList)}
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

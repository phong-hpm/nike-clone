import { FC, useMemo } from "react";
import Link from "next/link";

export interface BreadcrumbsProps {
  navigation: INavigation;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ navigation }) => {
  const groupNav = useMemo(() => navigation.parent, [navigation]);

  if (navigation.level !== "link") return <></>;

  return (
    <div className="page-spacing">
      <div className="flex text-sm font-medium">
        {groupNav && (
          <>
            <Link href={`/products/${groupNav.urlPath}`}>
              <p className="hover:text-gray-main cursor-pointer">{groupNav.label}</p>
            </Link>
            <p className="px-1.5">/</p>
          </>
        )}
        <Link href={`/products/${navigation.urlPath}`}>
          <p className="hover:text-gray-main cursor-pointer">{navigation.label}</p>
        </Link>
      </div>
    </div>
  );
};

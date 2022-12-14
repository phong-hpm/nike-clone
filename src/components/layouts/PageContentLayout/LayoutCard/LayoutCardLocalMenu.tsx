import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import { AutoFixed } from "@root/components/commons";

export interface LayoutCardLocalMenuProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardLocalMenu: FC<LayoutCardLocalMenuProps> = ({ layoutCardDetail }) => {
  const router = useRouter();

  return (
    <AutoFixed order={0} className="h-20 lg:h-16" fixedClassName="page-spacing bg-white">
      <div className={cls("lg:flex justify-between items-center flex-wrap")}>
        <p className="font-medium text-xl is-fixed:text-2xl lg:text-2xl is-fixed:lg:text-base">
          {layoutCardDetail.title}
        </p>

        <div className="grow flex md:justify-end lg:justify-center overflow-x-auto hide-scroll-bar">
          {layoutCardDetail.items?.map((item, index) => {
            return (
              <Link key={item.id} href={item.hrefPath || router.asPath}>
                <div
                  className={cls(
                    "px-3 py-2 lg:py-4 cursor-pointer font-medium whitespace-nowrap",
                    index === 0 && "ml-[-12px]",
                    index === layoutCardDetail.items.length - 1 && "mr-[-12px]",
                    !item.hrefPath && "text-gray-main !cursor-not-allowed"
                  )}
                >
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* additional space */}
        <div className="hidden opacity-0 lg:block">{layoutCardDetail.title}</div>
      </div>
    </AutoFixed>
  );
};

export default LayoutCardLocalMenu;

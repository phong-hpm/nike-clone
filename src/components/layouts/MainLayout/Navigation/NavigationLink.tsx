import { FC, HTMLAttributes } from "react";
import Link from "next/link";

// custom hooks
import { useNavigation } from "@root/hooks";

export interface NavigationLinkRops extends HTMLAttributes<HTMLParagraphElement> {
  navigation: INavigation;
}

const NavigationLink: FC<NavigationLinkRops> = ({ navigation, className, onClick, ...props }) => {
  const { setNavigating } = useNavigation();

  const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setNavigating(true);
    onClick?.(event);
  };

  return (
    <Link href={`/products/${navigation.urlPath}`}>
      <p
        {...props}
        className={mapClasses("cursor-pointer font-medium", className)}
        onClick={handleClick}
      >
        {navigation.label}
      </p>
    </Link>
  );
};

export default NavigationLink;

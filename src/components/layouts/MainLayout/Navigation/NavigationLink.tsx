import { FC, HTMLAttributes } from "react";

// custom hooks
import { useNavigation } from "@root/hooks";
import { mapPageUrl } from "@root/utils";

export interface NavigationLinkRops extends HTMLAttributes<HTMLParagraphElement> {
  navigation: INavigation;
}

const NavigationLink: FC<NavigationLinkRops> = ({ navigation, className, ...props }) => {
  const { navigate, onNavigate } = useNavigation();

  const handleClick = () => {
    navigate(mapPageUrl.mapProducts(navigation));
    onNavigate?.(navigation);
  };

  return (
    <p
      {...props}
      className={mapClasses("cursor-pointer font-medium", className)}
      onClick={handleClick}
    >
      {navigation.label}
    </p>
  );
};

export default NavigationLink;

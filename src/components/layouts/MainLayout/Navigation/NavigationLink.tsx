import { FC, HTMLAttributes, ReactNode } from "react";

// custom hooks
import { useNavigation } from "@root/hooks";

// utils
import { mapPageUrl } from "@root/utils";

export interface NavigationLinkRops extends HTMLAttributes<HTMLParagraphElement> {
  navigation: INavigation;
  children?: ReactNode;
  onClick?: () => void;
}

const NavigationLink: FC<NavigationLinkRops> = ({
  navigation,
  className,
  children,
  onClick,
  ...props
}) => {
  const { navigate, onNavigate } = useNavigation();

  const handleClick = () => {
    if (!navigation.filterIdList.length && !navigation.hrefPath) return;
    if (!navigation.filterIdList.length) {
      navigate(mapPageUrl.mapLayout(navigation));
    } else {
      navigate(mapPageUrl.mapProducts(navigation));
    }

    onNavigate?.(navigation);
    onClick?.();
  };

  return (
    <p {...props} className={cls("cursor-pointer font-medium", className)} onClick={handleClick}>
      {navigation.label}
    </p>
  );
};

export default NavigationLink;

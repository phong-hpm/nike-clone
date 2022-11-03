import { FC } from "react";

// components
import { IconSvg } from "@root/components/commons";

// utils
import { parseRegularHours } from "@root/utils";

export interface RetailDetailCardProps {
  retail: IRetail;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const RetailDetailCard: FC<RetailDetailCardProps> = ({
  retail,
  isSelected,
  className,
  onClick,
}) => {
  const { name, address, operationalDetails } = retail.detail!;
  const { address1, address2, city, state, postalCode, iso2Country } = address;

  const { openTime, openningStatus } = parseRegularHours(
    operationalDetails.hoursOfOperation.regularHours
  );

  return (
    <div
      className={cls(
        "relative cursor-pointer p-6 bg-white",
        "border-b border-b-neutral-200",
        isSelected && "bg-neutral-100",
        className
      )}
      onClick={onClick}
    >
      <div className={cls("absolute top-0 left-0 h-full w-1", isSelected && "bg-black")} />
      <div className="flex justify-between items-start font-medium">
        <div className="grow flex flex-row justify-between">
          <p>{name}</p>
          <p className="whitespace-nowrap ml-4 text-right">{retail.distance} km</p>
        </div>

        <IconSvg icon="arrow" className="basis-6 shrink-0 arrow-right ml-1" />
      </div>

      <div className="text-gray-main font-light">
        <p>{address1}</p>
        <p>{address2}</p>
        <p>{[city, state, postalCode, iso2Country].join(", ")}</p>
        <p>
          {openningStatus === "open" && <span className="text-success">Open</span>}
          {openningStatus === "closing_soon" && <span className="text-accent">Closing Soon</span>}
          {openningStatus === "closed" && <span className="text-error">Closed</span>}
          <span className="mx-1">•</span>
          <span>{`${openTime}`}</span>
        </p>
      </div>
    </div>
  );
};

export default RetailDetailCard;

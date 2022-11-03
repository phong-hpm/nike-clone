declare interface ICoordinates {
  longitude: number;
  latitude: number;
}

declare type TDayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

declare interface IRetail extends ICoordinates {
  uid: string;
  postalCode: string;
  distance?: number;
  detail?: {
    name: string;
    coordinates: ICoordinates;
    address: {
      area: string;
      city: string;
      state: string;
      country: string;
      address1: string;
      address2: string;
      address3: string;
      postalCode: string;
      iso2Country: string;
    };
    operationalDetails: {
      hoursOfOperation: {
        regularHours: Record<
          TDayOfWeek,
          {
            duration: string;
            startTime: string;
          }[]
        >;
      };
    };
  };
}

declare interface IOpenStreetData {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

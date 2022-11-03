import { MAP_GL } from "@root/constance";

/**
 * source: https://www.movable-type.co.uk/scripts/latlong.html
 */
export const calculateDistance = ([firstPoint, secondPoint]: [
  { latitude: number; longitude: number },
  { latitude: number; longitude: number }
]) => {
  const R = 6371e3; // metres
  const φ1 = (firstPoint.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (secondPoint.latitude * Math.PI) / 180;
  const Δφ = ((secondPoint.latitude - firstPoint.latitude) * Math.PI) / 180;
  const Δλ = ((secondPoint.longitude - firstPoint.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return Math.ceil(d / 100) / 10;
};

export const sortRetailDistances = (coordinates: ICoordinates, retails: IRetail[]) => {
  return (
    [...retails]
      // sort by distance
      .sort((prev, next) => {
        const prevDistance = calculateDistance([
          coordinates,
          { latitude: prev.latitude, longitude: prev.longitude },
        ]);
        const nextDistance = calculateDistance([
          coordinates,
          { latitude: next.latitude, longitude: next.longitude },
        ]);
        return prevDistance - nextDistance;
      })
  );
};

export const updateRetailDistances = ({
  retailList,
  distanceCenter,
  sortCenter,
}: {
  distanceCenter: ICoordinates;
  sortCenter?: ICoordinates;
  retailList: IRetail[];
}) => {
  const result = sortRetailDistances(sortCenter || distanceCenter, retailList);

  return result.map((retail) => {
    const { latitude, longitude } = retail;
    const distance = calculateDistance([distanceCenter, { latitude, longitude }]);
    return { ...retail, distance };
  });
};

export const getNearestRetails = (coordinates: ICoordinates, retailList: IRetail[]) => {
  const nearestRetails: IRetail[] = [];
  const countryCodeSet = new Set();

  const cloneRetails = updateRetailDistances({ distanceCenter: coordinates, retailList });

  cloneRetails
    // get nearest retails
    .forEach((retail) => {
      // at least [MAP_GL.MAX_POINTS] retails
      if (nearestRetails.length < MAP_GL.MAX_POINTS) {
        countryCodeSet.add(retail.postalCode);
        nearestRetails.push(retail);
      } else {
        // all retails have same [postalCode] have to be showed
        if (countryCodeSet.has(retail.postalCode)) {
          nearestRetails.push(retail);
        }
      }
    });

  return nearestRetails;
};

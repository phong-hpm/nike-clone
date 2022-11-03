// default: Ho Chi Minh city, Viet Nam
const SERVER_LATITUDE = process.env.NEXT_PUBLIC_SERVER_LOCATION_LATITUDE || "10.7758439";
const SERVER_LONGITUDE = process.env.NEXT_PUBLIC_SERVER_LOCATION_LONGITUDE || "106.7017555";

export const MAP_GL = {
  DEFAULT_COORDINATES: {
    latitude: Number(SERVER_LATITUDE),
    longitude: Number(SERVER_LONGITUDE),
  } as ICoordinates,
  ACCESS_TOKEN:
    "pk.eyJ1IjoicGhvbmdob3BoYW1taW5oIiwiYSI6ImNsOXc4eThidDJlMTc0MW8waXFydHpmN3YifQ.7KadGMC-yD4crhvxW-LIlQ",
  MAP_STYLE: "mapbox://styles/mapbox/light-v10",
  VIEW_STATE: {
    latitude: Number(SERVER_LATITUDE),
    longitude: Number(SERVER_LONGITUDE),
    zoom: 12,
    bearing: 0,
    pitch: 0,
  },
  MAX_POINTS: 15,
};

import { useContext, useEffect, useMemo, useRef } from "react";
import MapGl, { NavigationControl, GeolocateControl, Marker, MapRef } from "react-map-gl";

// components
import { IconSvg } from "@root/components/commons";

// modules
import RetailDetailCard from "./RetailList/RetailDetailCard";

// constance
import { MAP_GL } from "@root/constance";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";
import { RetailContext } from "./RetailContext";

const RetailMap = () => {
  const { loading, displayRetails, selectedRetailUid, setSelectedRetailUid } =
    useContext(RetailContext);

  const isScreenLG = useMediaScreen("lg");

  const mapRef = useRef<MapRef>(null);

  const selectedRetail = useMemo(
    () => displayRetails.find(({ uid }) => uid === selectedRetailUid),
    [selectedRetailUid, displayRetails]
  );

  useEffect(() => {
    if (!selectedRetail) return;
    const { longitude, latitude } = selectedRetail;
    mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 15 });
  }, [mapRef, selectedRetail]);

  // jump to the first location by default
  useEffect(() => {
    if (!displayRetails[0]) return;
    const { longitude, latitude } = displayRetails[0];
    mapRef.current?.jumpTo({ center: [longitude, latitude] });
  }, [mapRef, displayRetails]);

  if (process.env.NODE_ENV === "development") {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-black/[0.2]">
        <p>Map api works on production only, please check at</p>
        <a
          className="ml-1 text-blue-700 underline cursor-pointer"
          href="https://nike-clone.cf/retail"
        >
          Live Demo
        </a>
      </div>
    );
  }

  return (
    <div className="relative h-[80vh]">
      <MapGl
        ref={mapRef}
        initialViewState={MAP_GL.VIEW_STATE}
        mapboxAccessToken={MAP_GL.ACCESS_TOKEN}
        mapStyle={MAP_GL.MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <GeolocateControl position="top-right" />

        {displayRetails.map(({ uid, latitude, longitude }) => (
          <Marker key={uid} anchor="bottom" longitude={longitude} latitude={latitude}>
            <IconSvg
              icon="location"
              width={36}
              height={36}
              onClick={() => setSelectedRetailUid(uid)}
            />
          </Marker>
        ))}
      </MapGl>

      {!isScreenLG && !!selectedRetail && (
        <div className="absolute z-10 left-6 bottom-6 right-6">
          <RetailDetailCard className="rounded-xl shadow-xl" retail={selectedRetail} />
        </div>
      )}

      {loading && (
        <div
          className={cls(
            "absolute z-20 top-0 left-0 w-full h-full bg-black/[0.2]",
            "flex justify-center items-center"
          )}
        >
          <div className="bg-white rounded-xl p-4">
            <div className="spinner" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailMap;

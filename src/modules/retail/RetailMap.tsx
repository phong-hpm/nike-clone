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
    mapRef.current?.flyTo({
      center: [selectedRetail.longitude, selectedRetail.latitude],
      zoom: 15,
    });
  }, [mapRef, selectedRetail]);

  // jump to the first location by default
  useEffect(() => {
    if (!displayRetails[0]) return;
    mapRef.current?.jumpTo({ center: [displayRetails[0].longitude, displayRetails[0].latitude] });
  }, [mapRef, displayRetails]);

  return (
    <div className="relative">
      <MapGl
        ref={mapRef}
        initialViewState={MAP_GL.VIEW_STATE}
        mapboxAccessToken={MAP_GL.ACCESS_TOKEN}
        mapStyle={MAP_GL.MAP_STYLE}
        style={{ height: "80vh" }}
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

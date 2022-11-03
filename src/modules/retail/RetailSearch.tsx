import { useContext, useState } from "react";

// components
import { IconSvg, Input } from "@root/components/commons";

// modules
import { RetailContext } from "./RetailContext";

// utils
import { apiHandlers } from "@root/utils";

const RetailSearch = () => {
  const { loading, setLoading, displayRetails, updateRetailDetails } = useContext(RetailContext);

  const [focusing, setFocusing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [placeList, setPlaceList] = useState<IOpenStreetData[]>([]);

  const handleSelect = async (place: IOpenStreetData) => {
    if (selectedPlace === place.place_id) return;
    setSelectedPlace(place.place_id);
    setSearchValue(place.display_name);
    updateRetailDetails({ latitude: Number(place.lat), longitude: Number(place.lon) });
  };

  const handleSearch = async (q: string) => {
    if (!q && q !== "") return;
    setPlaceList([]);
    setLoading(true);
    const { error, data } = await apiHandlers.searchAddress(q);
    if (!error || data?.length) {
      setPlaceList(data);
      setSelectedPlace(data[0].place_id);
      const coords = { latitude: Number(data[0].lat), longitude: Number(data[0].lon) };
      updateRetailDetails(coords);
    }
  };

  return (
    <div className="mb-4 px-8 pt-8">
      <h1 className="mb-9 text-[28px] font-medium lg:text-center">Find a Nike Store</h1>

      <div className="relative">
        <Input
          endAdornment={
            <div
              className="bg-neutral-200 rounded-lg p-2.5 cursor-pointer"
              onClick={() => !loading && handleSearch(searchValue)}
            >
              <IconSvg icon="search" />
            </div>
          }
          containerClass="mb-4"
          endAdornmentClass="!p-0 m-1.5"
          placeholder="Search Location"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setFocusing(true)}
          // wait for [handleSelect] in listItem was fired
          onBlur={() => setTimeout(() => setFocusing(false), 1)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSearch(searchValue)}
        />

        <div
          className={cls(
            "absolute z-10 top-[calc(100%+5px)] left-0 w-full",
            "bg-white shadow-2xl rounded overflow-hidden",
            (!focusing || !placeList.length) && "invisible"
          )}
        >
          <div className={cls("max-h-48 p-3 overflow-auto custom-scroll-bar")}>
            {placeList.map((place) => (
              <div
                key={place.place_id}
                className={cls(
                  "cursor-pointer my-1 p-3 rounded-xl hover:bg-neutral-100",
                  selectedPlace === place.place_id && "bg-neutral-100 !cursor-not-allowed"
                )}
                onMouseDown={() => handleSelect(place)}
              >
                <p className="truncate">{place.display_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="font-light text-sm text-gray-main">{displayRetails.length} Stores Near You</p>
    </div>
  );
};

export default RetailSearch;

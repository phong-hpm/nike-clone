import { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";

// graphqlQueries
import graphqlQueries from "@root/graphqlQueries";

// utils
import { getNearestRetails, updateRetailDistances } from "@root/utils";

// constance
import { MAP_GL } from "@root/constance";

interface RetailContextProps {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  retailList: IRetail[];
  displayRetails: IRetail[];
  selectedRetailUid: string;
  setSelectedRetailUid: (uid: string) => void;
  updateRetailDetails: (center: ICoordinates) => Promise<void>;
}

export const RetailContext = createContext<RetailContextProps>({
  loading: true,
  setLoading: () => {},
  retailList: [],
  displayRetails: [],
  selectedRetailUid: "",
  setSelectedRetailUid: () => {},
  updateRetailDetails: () => Promise.resolve(),
});

export interface RetailProviderProps {
  retailList: IRetail[];
  children: ReactNode;
}

const RetailProvider: FC<RetailProviderProps> = ({ retailList, children }) => {
  const [loadRetails] = useLazyQuery<{ retailList: IRetail[] }>(graphqlQueries.RETAIL_DETAILS, {});

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayRetails, setDisplayRetails] = useState<IRetail[]>([]);
  const [selectedRetailUid, setSelectedRetailUid] = useState("");
  // by default, [userCoords] is server's coordinates, until user allow sharing location
  const [userCoords, setUserCoords] = useState(MAP_GL.DEFAULT_COORDINATES);

  const updateRetailDetails = useCallback(
    async (center: ICoordinates) => {
      setLoading(true);
      // records existed
      const retails = getNearestRetails(center, retailList);
      const uidList = retails.map(({ uid }) => uid);

      if (uidList.length) {
        const { data } = await loadRetails({ variables: { where: { uid: { _in: uidList } } } });
        const records = updateRetailDistances({
          distanceCenter: userCoords,
          sortCenter: center, // sort by "search" center
          retailList: data?.retailList || [],
        });
        setDisplayRetails(records);
      }
      setLoading(false);
    },
    [userCoords, loadRetails, retailList]
  );

  // check and get user's location in localStorage as default
  useEffect(() => {
    let defaultUserCoords = MAP_GL.DEFAULT_COORDINATES;
    if (localStorage.getItem("userLatitude") && localStorage.getItem("userLongitude")) {
      defaultUserCoords = {
        latitude: Number(localStorage.getItem("userLatitude")),
        longitude: Number(localStorage.getItem("userLongitude")),
      };
    }

    setUserCoords(defaultUserCoords);
    setMounted(true);
  }, []);

  // request and update user's location
  useEffect(() => {
    if (!mounted) return;
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      const isSameLatitude = String(latitude) === localStorage.getItem("userLatitude");
      const isSameLongitude = String(longitude) === localStorage.getItem("userLongitude");

      if (!isSameLatitude || !isSameLongitude) {
        setUserCoords({ latitude, longitude });
        // save user's location to localStorage
        localStorage.setItem("userLatitude", `${latitude}`);
        localStorage.setItem("userLongitude", `${longitude}`);
      }
    });
  }, [mounted]);

  // update retail every time user's location updated
  useEffect(() => {
    if (mounted) updateRetailDetails(userCoords);
  }, [updateRetailDetails, mounted, userCoords]);

  const values = useMemo(
    () => ({
      loading,
      setLoading,
      retailList,
      displayRetails,
      selectedRetailUid,
      setSelectedRetailUid,
      updateRetailDetails,
    }),
    [loading, retailList, displayRetails, selectedRetailUid, updateRetailDetails]
  );

  return <RetailContext.Provider value={values}>{children}</RetailContext.Provider>;
};

export default RetailProvider;

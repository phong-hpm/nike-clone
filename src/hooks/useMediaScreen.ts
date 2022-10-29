import { useEffect, useState } from "react";

const screenSizes = {
  sm: 600,
  md: 768,
  lg: 960,
  xl: 1280,
  "2xl": 1536,
};

const useMediaScreen = (screen: "2xl" | "xl" | "lg" | "md" | "sm") => {
  const [mediaScreen, setMediaScreen] = useState(false);

  useEffect(() => {
    const updateMediaScreen = () => setMediaScreen(screenSizes[screen] <= window.innerWidth);
    updateMediaScreen();

    window.addEventListener("resize", updateMediaScreen);

    return () => window.removeEventListener("resize", updateMediaScreen);
  }, [screen]);

  return mediaScreen;
};

export default useMediaScreen;

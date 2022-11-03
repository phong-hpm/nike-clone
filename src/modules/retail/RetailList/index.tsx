import { FC, useContext, useEffect, useMemo, useRef } from "react";

// custom hooks
import useScroll from "@root/hooks/useScroll";
import useMediaScreen from "@root/hooks/useMediaScreen";

// modules
import { RetailContext } from "../RetailContext";
import RetailDetailCard from "./RetailDetailCard";

const RetailList = () => {
  const { loading, displayRetails, selectedRetailUid, setSelectedRetailUid } =
    useContext(RetailContext);

  const isScreenLG = useMediaScreen("lg");

  const { targetElement, setTargetElement } = useScroll();

  const elementRefs = useRef<Record<string, HTMLDivElement>>({});

  const validRetailList = useMemo(
    () => displayRetails.filter(({ detail }) => detail),
    [displayRetails]
  );

  useEffect(() => {
    if (selectedRetailUid || !displayRetails?.length) return;
    setSelectedRetailUid(displayRetails[0].uid);
  }, [selectedRetailUid, displayRetails, setSelectedRetailUid]);

  // Scroll the list to the selected Retail element
  // make sure selected Retail always on the view
  useEffect(() => {
    const selectedRetailEl = elementRefs.current[selectedRetailUid];
    if (!selectedRetailEl || !targetElement) return;
    const childrenTop = selectedRetailEl.getBoundingClientRect().top;
    const parentTop = targetElement.getBoundingClientRect().top;
    const parentScrollTop = targetElement.scrollTop;
    targetElement.scrollTo({ top: childrenTop - parentTop + parentScrollTop, behavior: "smooth" });
  }, [targetElement, selectedRetailUid]);

  return (
    <div
      ref={setTargetElement}
      className="custom-scroll-bar border-t border-t-neutral-200 !p-0 !m-0"
    >
      {loading && (
        <div className="flex justify-center py-10">
          <div className="spinner" />
        </div>
      )}

      {!loading &&
        validRetailList.map((retail) => (
          <div key={retail.uid} ref={(ref) => ref && (elementRefs.current[retail.uid] = ref)}>
            <RetailDetailCard
              retail={retail}
              isSelected={isScreenLG && selectedRetailUid === retail.uid}
              onClick={() => setSelectedRetailUid(retail.uid)}
            />
          </div>
        ))}
    </div>
  );
};

export default RetailList;

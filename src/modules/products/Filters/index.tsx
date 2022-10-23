import { FC, useEffect } from "react";

// components
import {
  AutoFixed,
  ButtonIcon,
  IconSvg,
  Modal,
  ModalBody,
  ModalHeader,
} from "@root/components/commons";

// custom hooks
import { useScrollByScreen } from "@root/hooks";
import useMediaScreen from "@root/hooks/useMediaScreen";

// modules
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";

// constance
import { SORT_BY_OPTIONS } from "@root/constance";

export interface FiltersProps {
  isShowBar: boolean;
  isShowModal: boolean;
  onHide: () => void;
}

const Filters: FC<FiltersProps> = ({ isShowBar, isShowModal, onHide }) => {
  const isScreenLG = useMediaScreen("lg");
  const { setTargetEl, triggerUpdate } = useScrollByScreen();

  useEffect(() => {
    window.addEventListener("scroll", triggerUpdate);
    return () => window.removeEventListener("scroll", triggerUpdate);
  }, [triggerUpdate]);

  if (!isScreenLG) {
    return (
      <div className="">
        <div className="page-spacing border border-transparent border-b-neutral-200 mb-4">
          <CategoryList />
        </div>

        <Modal isShow={isShowModal} isFull animation="slide-up">
          <ModalHeader>
            <p>Filter</p>
            <ButtonIcon className="hover:!bg-transparent" onClick={onHide}>
              <IconSvg icon="time-filled" width={30} height={30} />
            </ButtonIcon>
          </ModalHeader>

          <ModalBody className="py-5">
            <div>
              <p className="font-medium">Sort By</p>
              {SORT_BY_OPTIONS.map(({ value, label }) => (
                <div key={value}>{label}</div>
              ))}
            </div>

            <FilterList />
          </ModalBody>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      {/* spacing, useful when all filters was moved to [fixedContainer] */}
      <div className={cls("transition-width", isShowBar ? "w-65" : "!w-0")} />
      <AutoFixed extendTop={48}>
        <div
          className={cls(
            "flex justify-end", // support for animation
            "w-65 transition-width bg-white",
            !isShowBar && "!w-0"
          )}
        >
          <div className="page-spacing !pr-0">
            <div ref={(ref) => setTargetEl(ref)} className="pr-3">
              <CategoryList />
              <FilterList toggleable />
            </div>
          </div>
        </div>
      </AutoFixed>
    </div>
  );
};

export default Filters;

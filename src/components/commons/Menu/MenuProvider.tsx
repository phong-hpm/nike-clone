import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

export type MenuOptionType = {
  value: string;
  label: string;
};

export type MenuContextType = {
  title: string;
  isShow: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  selectedOption: MenuOptionType;
  setSelectedOption: Dispatch<SetStateAction<MenuOptionType>>;
  options: MenuOptionType[];
  onChange: (option: MenuOptionType) => void;
};
export const MenuContext = createContext<MenuContextType>({
  title: "",
  isShow: false,
  setShow: () => {},
  selectedOption: { value: "", label: "" },
  setSelectedOption: () => {},
  options: [],
  onChange: () => {},
});

export interface MenuProviderProps {
  title: string;
  options: MenuOptionType[];
  selectedValue?: string;
  onChange: (option: MenuOptionType) => void;
  children: ReactNode;
}

const MenuProvider: FC<MenuProviderProps> = ({
  title,
  options,
  selectedValue = "",
  onChange,
  children,
}) => {
  const [isShow, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState<MenuOptionType>(
    // set [selectedOption] by [defaultValue], will prevent empty value in the first rendering
    options.find((option) => option.value === selectedValue || option.value === "") || {
      value: "",
      label: "",
    }
  );

  const values = useMemo(
    () => ({
      title,
      isShow,
      setShow,
      selectedOption,
      setSelectedOption,
      options,
      onChange,
    }),
    [title, isShow, selectedOption, options, onChange]
  );

  useEffect(() => {
    const option = options.find((option) => option.value === selectedValue || "");
    if (!option) return;
    setSelectedOption(option);
  }, [selectedValue, options]);

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
};

export default MenuProvider;

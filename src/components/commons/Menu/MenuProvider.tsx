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
  defaultValue?: string;
  options: MenuOptionType[];
  onChange: (option: MenuOptionType) => void;
  children: ReactNode;
}

const MenuProvider: FC<MenuProviderProps> = ({
  title,
  options,
  defaultValue = "",
  onChange,
  children,
}) => {
  const [isShow, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState<MenuOptionType>(
    // set [selectedOption] by [defaultValue], will prevent empty value in the first rendering
    options.find(({ value }) => value === defaultValue) || { value: "", label: "" }
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

  // update [selectedOption] when [defaultValue] was changed
  useEffect(() => {
    const option = options.find(({ value }) => value === defaultValue);
    setSelectedOption(option || { value: "", label: "" });
  }, [defaultValue, options]);

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
};

export default MenuProvider;

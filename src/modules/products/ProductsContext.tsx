import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";

// custom hooks
import { useNavigation } from "@root/hooks";

// utils
import { mapPageUrl } from "@root/utils";
import { UrlObject } from "url";

export type FilterConditionType = {
  filters?: {
    _regex: string;
  };
  _or?: FilterConditionType[];
};

interface IProductsContextTypes {
  filterIdList: string[];
  navigation?: INavigation;
  categoryList: ICategory[];
  filterOptionList: IFilterOption[];
  productCount: number;
  setProductCount: (count: number) => void;
  selectedCategory: string;
  updateSelectedCategory: (uid: string) => void;
  updateSelectedOptions: (uid: string) => void;
  queryConditions: FilterConditionType[];
}

export const ProductsContext = createContext<IProductsContextTypes>({
  filterIdList: [],
  categoryList: [],
  filterOptionList: [],
  productCount: 0,
  setProductCount: () => {},
  selectedCategory: "",
  updateSelectedCategory: () => {},
  updateSelectedOptions: () => {},
  queryConditions: [],
});

export interface ProductsProviderProps {
  filterIdList: string[];
  navigation?: INavigation;
  categoryList: ICategory[];
  filterOptionList: IFilterOption[];
  children: ReactNode;
}

const ProductsProvider: FC<ProductsProviderProps> = ({
  filterIdList: filterIdListProp,
  navigation,
  categoryList,
  filterOptionList,
  children,
}) => {
  const router = useRouter();
  const { navigate } = useNavigation();

  const keepRef = useRef({
    filterIdList: [] as string[],
    queryConditions: [] as FilterConditionType[],
  });

  const [productCount, setProductCount] = useState(0);
  const [filterIdList, setFilterIdList] = useState<string[]>(filterIdListProp);

  const selectedCategory = useMemo(() => {
    return categoryList.find(({ uid }) => filterIdList.includes(uid))?.uid || "";
  }, [filterIdList, categoryList]);

  // use to get [products] and [products_aggregate], Example:
  // [
  //   { filters: { _regex: "category.uid" } },
  //   { _or: [
  //     { filters: { _regex: "option.uid_1" } },
  //     ...
  //   ] },
  //   { filters: { _regex: "nagivation.filterId_1" } },
  //   ...
  // ];
  const queryConditions = useMemo(() => {
    // check if [filterIdList] is changed
    if (keepRef.current.filterIdList === filterIdList) {
      return keepRef.current.queryConditions;
    }

    let filterIdLeft = [...filterIdList];

    const conditions: FilterConditionType[] = [];

    if (selectedCategory) {
      filterIdLeft = filterIdLeft.filter((uid) => uid !== selectedCategory);
      conditions.push({ filters: { _regex: selectedCategory } });
    }

    filterOptionList.forEach((filterOption) => {
      const _or: FilterConditionType[] = [];

      filterOption.options?.forEach((option) => {
        if (filterIdLeft.includes(option.uid)) {
          filterIdLeft = filterIdLeft.filter((uid) => uid !== option.uid);
          _or.push({ filters: { _regex: option.uid } });
        }
      });

      if (_or.length) conditions.push({ _or });
    });

    filterIdLeft.forEach((filterUid) => conditions.push({ filters: { _regex: filterUid } }));

    // these state will be use to check when [queryConditions] will return a new reference
    keepRef.current.filterIdList = filterIdList;
    keepRef.current.queryConditions = conditions;
    return conditions;
  }, [filterIdList, selectedCategory, filterOptionList]);

  const updateFilterIdList = useCallback(
    (newFilterIdList: string[]) => {
      if (!navigation) return;
      setFilterIdList(newFilterIdList);

      navigate(
        {
          pathname: mapPageUrl.mapProducts(navigation, newFilterIdList),
          query: { order: router.query.order },
        },
        { shallow: true }
      );
    },
    [navigate, navigation, router]
  );

  const updateSelectedCategory = useCallback(
    (extraUid: string) => {
      const newFilterIdList = [...filterIdList.filter((uid) => uid !== selectedCategory), extraUid];
      updateFilterIdList(newFilterIdList);
    },
    [filterIdList, updateFilterIdList, selectedCategory]
  );

  const updateSelectedOptions = useCallback(
    (extraUid: string) => {
      if (filterIdList.includes(extraUid)) {
        updateFilterIdList(filterIdList.filter((uid) => uid !== extraUid));
      } else {
        updateFilterIdList([...filterIdList, extraUid]);
      }
    },
    [filterIdList, updateFilterIdList]
  );

  const values = useMemo(
    () => ({
      filterIdList,
      navigation,
      categoryList,
      filterOptionList,
      productCount,
      setProductCount,
      selectedCategory,
      updateSelectedCategory,
      updateSelectedOptions,
      queryConditions,
    }),
    [
      filterIdList,
      navigation,
      categoryList,
      filterOptionList,
      productCount,
      selectedCategory,
      updateSelectedCategory,
      updateSelectedOptions,
      queryConditions,
    ]
  );

  useEffect(() => {
    setFilterIdList(filterIdListProp);
  }, [filterIdListProp]);

  return <ProductsContext.Provider value={values}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;

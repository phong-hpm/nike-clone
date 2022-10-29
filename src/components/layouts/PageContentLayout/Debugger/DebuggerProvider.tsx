import { createContext, FC, ReactNode, useMemo } from "react";

export interface IDebugCard {
  nodes: { mode: string; text: string }[];
}

export const DebuggerContext = createContext<{ debugCardMap: Record<string, IDebugCard> }>({
  debugCardMap: {},
});

export interface DebuggerProviderProps {
  layout: ILayout;
  layoutItemList: ILayoutItem[];
  children: ReactNode;
}

const DebuggerProvider: FC<DebuggerProviderProps> = ({ layout, children, layoutItemList }) => {
  const debugCardMap = useMemo(() => {
    const cardMap: Record<string, IDebugCard> = {};
    const layoutItemMap: Map<String, ILayoutItem> = layoutItemList.reduce(
      (map, val) => map.set(val.uid, val),
      new Map()
    );

    const findDown = (id: string, parents: { mode: string; text: string }[]) => {
      const layoutItem = layoutItemMap.get(id);

      if (!layoutItem) return;

      const currentParent = [
        ...parents,
        {
          mode: layoutItem.mode,
          text: `${layoutItem.uid} (${layoutItem.detail.items?.length || 1})`,
        },
      ];

      if (layoutItem.card) {
        cardMap[layoutItem.card.uid] = {
          nodes: [
            ...currentParent,
            { mode: "card", text: layoutItem.card.uid },
            { mode: "containerType", text: layoutItem.card.detail.containerType },
          ],
        };
      } else {
        layoutItem.detail.items?.forEach((itemId) => findDown(itemId, currentParent));
      }
    };

    layout?.detail?.items?.forEach((id) => findDown(id, []));

    return cardMap;
  }, [layout, layoutItemList]);

  const values = useMemo(() => ({ debugCardMap }), [debugCardMap]);

  return <DebuggerContext.Provider value={values}>{children}</DebuggerContext.Provider>;
};

export default DebuggerProvider;

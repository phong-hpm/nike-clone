import { FC, useContext } from "react";
import { DebuggerContext } from "./DebuggerProvider";

const NEXT_PUBLIC_DEBUG_LAYOUT = process.env.NEXT_PUBLIC_DEBUG_LAYOUT;

export interface CardDebuggerProps {
  cardUid: string;
}

const CardDebugger: FC<CardDebuggerProps> = ({ cardUid }) => {
  const { debugCardMap } = useContext(DebuggerContext);

  const debugCard = debugCardMap[cardUid];

  if (NEXT_PUBLIC_DEBUG_LAYOUT !== "1") return <></>;

  return (
    <div className="grow text-xs">
      {debugCard?.nodes.map((node, index) => {
        return (
          <p key={node.text} style={{ paddingLeft: 8 * index }}>
            {node.mode}: {node.text}
          </p>
        );
      })}
    </div>
  );
};

export default CardDebugger;

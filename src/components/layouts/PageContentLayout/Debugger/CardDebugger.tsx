import { FC, useContext, useRef } from "react";
import { DebuggerContext } from "./DebuggerProvider";

const NEXT_PUBLIC_DEBUG_LAYOUT = process.env.NEXT_PUBLIC_DEBUG_LAYOUT;

export interface CardDebuggerProps {
  cardUid: string;
}

const CardDebugger: FC<CardDebuggerProps> = ({ cardUid }) => {
  const { debugCardMap } = useContext(DebuggerContext);

  const keepRef = useRef({ index: 0 });
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
      {/* <p>G: {debugCard?.grid || "not found"}</p>
      <p className="pl-2">R: {debugCard?.row || "not found"}</p>
      <p className="pl-4">C: {debugCard?.col || "not found"}</p>
      <p className="pl-6">B: {debugCard?.block || "not found"}</p>
      <p className="pl-8">CA: {debugCard?.card || "not found"}</p>
      <p className="pl-10 bg-blue-100">T: {debugCard?.containerType || "not found"}</p> */}
    </div>
  );
};

export default CardDebugger;

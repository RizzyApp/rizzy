import { useEffect, useRef } from "react";
import { animated } from "@react-spring/web";
import useSwipeDeck from "./hooks/useSwipeDeck";
import DebugInfo from "./DebugInfo";
import CardContent from "./CardContent/CardContent";

const FIRST_INDEX = 0;
const MAXIMUM_Z_INDEX = 100;

const SwipeDeck = ({ initialCards, deckWidth }) => {
  const { bind, debugInfo, reset, animatedStyles, isDevelopment, cards } =
    useSwipeDeck(initialCards, deckWidth);

  const animatedDivRef = useRef(null);

  useEffect(() => {
    console.log("Component rendered or re-rendered");
  });

  const renderCards = () =>
    cards.map((card, index) => (
      <animated.div
        ref={index === FIRST_INDEX ? animatedDivRef : null}
        key={index}
        {...(index === FIRST_INDEX ? bind() : {})}
        style={{
          touchAction: "none",
          position: "absolute",
          zIndex:
            index === FIRST_INDEX ? MAXIMUM_Z_INDEX : cards.length - index,
          ...(index === FIRST_INDEX ? animatedStyles : {}),
        }}
      >
        <CardContent data={card} animatedDivRef={animatedDivRef} />
      </animated.div>
    ));

  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      {renderCards()}
      {isDevelopment && <DebugInfo debugInfo={debugInfo} reset={reset} />}
    </div>
  );
};

export default SwipeDeck;

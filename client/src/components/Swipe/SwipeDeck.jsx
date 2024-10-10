import useSwipeDeck from "./hooks/useSwipeDeck";
import SwipeCard from "./SwipeCard";
import DebugInfo from "./DebugInfo";

const SwipeDeck = ({ cards, deckWidth }) => {
  const { bind, debugInfo, reset, animatedStyles, isDevelopment } =
    useSwipeDeck(cards, deckWidth);
  return (
    <div className="relative">
      {cards.map((card, index) => (
        <SwipeCard
          key={index}
          deckWidth={deckWidth}
          bind={bind}
          isActive={index === 0} // Adjust as per your active card logic
          animatedStyles={animatedStyles} // Pass the combined styles
        >
          {card.content}
        </SwipeCard>
      ))}
      {isDevelopment && <DebugInfo debugInfo={debugInfo} reset={reset} />}
    </div>
  );
};

export default SwipeDeck;

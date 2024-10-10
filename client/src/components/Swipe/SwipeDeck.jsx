import useSwipeDeck from "./hooks/useSwipeDeck";
import SwipeCard from "./SwipeCard";
import DebugInfo from "./DebugInfo";

const SwipeDeck = ({ initialCards, deckWidth }) => {
  const {
    bind,
    debugInfo,
    reset,
    animatedStyles,
    activeIndex,
    isDevelopment,
    cards,
  } = useSwipeDeck(initialCards, deckWidth);

  //only the active card will be animated
  //activeIndex currently is always 0, because the top card is always the first card in the deck!
  return (
    <div className="relative">
      {cards.map((card, index) => (
        <SwipeCard
          key={index}
          deckWidth={deckWidth}
          bind={index === activeIndex ? bind : () => {}}
          isActive={index === activeIndex}
          animatedStyles={index === activeIndex ? animatedStyles : {}}
          zIndex={cards.length - index}
        >
          {card.content}
        </SwipeCard>
      ))}
      {isDevelopment && <DebugInfo debugInfo={debugInfo} reset={reset} />}
    </div>
  );
};

export default SwipeDeck;

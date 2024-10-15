import useSwipeDeck from "./hooks/useSwipeDeck";
import SwipeCard from "./SwipeCard";
import DebugInfo from "./DebugInfo";

const FIRST_INDEX = 0;

const SwipeDeck = ({ initialCards, deckWidth }) => {
  const { bind, debugInfo, reset, animatedStyles, isDevelopment, cards } =
    useSwipeDeck(initialCards, deckWidth);

  //only the active card will be animated
  //activeIndex currently is always 0, because the top card is always the first card in the deck!
  const renderCards = () =>
    cards.map((card, index) => (
      <SwipeCard
        key={index}
        deckWidth={deckWidth}
        bind={index === FIRST_INDEX ? bind : () => {}}
        isActive={index === FIRST_INDEX}
        animatedStyles={index === FIRST_INDEX ? animatedStyles : {}}
        zIndex={cards.length - index}
      >
        {card.content}
      </SwipeCard>
    ));

  return (
    <div className="relative">
      {renderCards()}
      {isDevelopment && <DebugInfo debugInfo={debugInfo} reset={reset} />}
    </div>
  );
};

export default SwipeDeck;

// useSwipeDeck.js
import { useEffect, useState } from "react";
import useSwipeAnimationHandler from "./useSwipeAnimationHandler";


const useSwipeDeckManager = (initialCards, deckWidth, cardImageRef, onSwipe) => {
  const [cards, setCards] = useState(initialCards);


  const onSwipeOut = (direction) => {
    setCards((prevCards) => {
      onSwipe(prevCards[0].id,direction);
      return prevCards.slice(1)
    });
    console.log(cards);
  };


  const { bind, swipeDebugInfo, reset, animatedStyles, y } = useSwipeAnimationHandler(deckWidth, onSwipeOut, cardImageRef);

  useEffect(() => {
    reset();
  }, [cards])

  const handleReset = () => {
    setCards(initialCards);
    reset();
  }


  return {
    bind,
    swipeDebugInfo,
    reset: handleReset,
    animatedStyles,
    y,
    cards
  };
};

export default useSwipeDeckManager;
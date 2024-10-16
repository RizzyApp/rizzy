// useSwipeDeck.js
import { useEffect, useState } from "react";
import useSwipeAnimationHandler from "./useSwipeAnimationHandler";


const useSwipeDeckManager = (initialCards, deckWidth, cardImageRef) => {
  const [cards, setCards] = useState(initialCards);


  const onSwipeOut = () => {
    setCards((prevCards) => prevCards.filter((_, index) => index !== 0));
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
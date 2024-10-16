// useSwipeDeck.js
import { useEffect, useRef, useState } from "react";
import useSwipeAnimation from "./useSwipeAnimation";

const IS_DEVELOPMENT = import.meta.env.DEV;

const useSwipeDeck = (initialCards, deckWidth, imageRef) => {
  const [cards, setCards] = useState(initialCards);


  const onSwipeOut = () => {
    setCards((prevCards) => prevCards.filter((_, index) => index !== 0));
    console.log(cards);
  };


  const { bind, debugInfo, reset, animatedStyles, y } = useSwipeAnimation(deckWidth, onSwipeOut, imageRef);

  useEffect(() => {
    reset();
  }, [cards])

  const handleReset = () => {
    setCards(initialCards);
    reset();
  }


  return {
    bind,
    debugInfo,
    reset: handleReset,
    animatedStyles,
    y,
    isDevelopment: IS_DEVELOPMENT,
    cards
  };
};

export default useSwipeDeck;
// useSwipeDeck.js
import { useEffect, useRef, useState } from "react";
import useAnimation from "./useAnimation";

const IS_DEVELOPMENT = import.meta.env.DEV;

const useSwipeDeck = (initialCards, deckWidth) => {
  const [cards, setCards] = useState(initialCards);
  const [activeIndex, setActiveIndex] = useState(0);


  const onSwipeOut = () => {
    setCards((prevCards) => prevCards.filter((_, index) => index !== 0));
    console.log(cards);
    console.log(activeIndex)
  };


  const { bind, debugInfo, reset, animatedStyles } = useAnimation(deckWidth, onSwipeOut);

  useEffect(() => {
    reset();
  }, [cards])

  const handleReset = () => {
    setCards(initialCards);
    reset();
  }

  debugInfo.index = activeIndex;

  return {
    bind,
    debugInfo,
    reset: handleReset,
    animatedStyles,
    activeIndex,
    isDevelopment: IS_DEVELOPMENT,
    cards
  };
};

export default useSwipeDeck;
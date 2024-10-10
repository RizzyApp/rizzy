// useSwipeDeck.js
import { useRef, useState } from "react";
import useAnimation from "./useAnimation";

const useSwipeDeck = (initialCards, deckWidth) => {
  const [cards, setCards] = useState(initialCards);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDevelopment = import.meta.env.DEV;
  const activeCardRef = useRef(0);

  const onSwipeOut = () => {
    // Logic to handle swipe out, like updating state to remove the card
    setCards((prevCards) => prevCards.filter((_, index) => index !== activeIndex));
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const { bind, debugInfo, reset, animatedStyles } = useAnimation(deckWidth, onSwipeOut);

  return {
    bind,
    debugInfo,
    reset,
    animatedStyles,
    activeCardRef,
    activeIndex,
    isDevelopment,

  };
};

export default useSwipeDeck;
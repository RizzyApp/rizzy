// useSwipeDeck.js
import useSwipeAnimationHandler from "./useSwipeAnimationHandler";


const useSwipeDeckManager = (setUsers, deckWidth, cardImageRef, onSwipe) => {


  const onSwipeOut = (direction) => {
    setUsers((prevCards) => {
      console.log("BEFORE THE SWIPE!");
      console.log(prevCards);
      onSwipe(prevCards[0].id,direction);
      reset()
      return prevCards.slice(1)
    });
  };


  const { bind, swipeDebugInfo, reset, animatedStyles, y } = useSwipeAnimationHandler(deckWidth, onSwipeOut, cardImageRef);

  return {
    bind,
    swipeDebugInfo,
    animatedStyles,
    y
  };
};

export default useSwipeDeckManager;
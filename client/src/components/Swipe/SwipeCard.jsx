import { animated } from "@react-spring/web";

//hopefully we won't have more than 100 cards in the deck lol
const MAXIMUM_Z_INDEX = 100;

const SwipeCard = ({ children, bind, animatedStyles, isActive, zIndex }) => {
  return (
    <>
      <animated.div
        {...bind()}
        style={{
          touchAction: "none",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: isActive ? MAXIMUM_Z_INDEX : zIndex,
          ...animatedStyles,
        }}
      >
        {children}
      </animated.div>
    </>
  );
};

export default SwipeCard;

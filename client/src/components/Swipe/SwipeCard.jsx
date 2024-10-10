import { animated } from "@react-spring/web";

//TODO: Fix that ZIndex, I don't like magic numbers

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
          zIndex: isActive ? 10 : zIndex, //that zIndex might cause trouble
          ...animatedStyles,
        }}
      >
        {children}
      </animated.div>
    </>
  );
};

export default SwipeCard;

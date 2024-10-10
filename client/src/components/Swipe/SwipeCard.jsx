import { forwardRef } from "react";
import { animated } from "@react-spring/web";

const SwipeCard = forwardRef(
  ({ children, bind, animatedStyles, isActive, zIndex }, ref) => {
    return (
      <>
        <animated.div
          {...bind()}
          ref={ref}
          style={{
            touchAction: "none",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: isActive ? 10 : zIndex,
            ...animatedStyles, // Spread animated styles here
          }}
        >
          {children}
        </animated.div>

        {/* Conditionally render DebugInfo if in development mode */}
      </>
    );
  }
);

SwipeCard.displayName = "SwipeCard";

export default SwipeCard;

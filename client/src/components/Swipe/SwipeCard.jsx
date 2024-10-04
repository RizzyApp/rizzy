import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { forwardRef } from "react";

const VELOCITY_THRESHOLD = 0.1;
const MAX_ROTATION = 45;
const FLY_RANGE = 300;

const SwipeCard = forwardRef(({ children, classname, deckWidth }, ref) => {
  const [{ x, rotateZ, scale, opacity }, api] = useSpring(() => ({
    x: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
  }));

  const reset = () => {
    //for debugging purposes
    api.set({ x: 0, rotateZ: 0, scale: 1, opacity: 1 });
  };

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], direction: [xDir] }) => {
      const halfCardWidth = (ref.current?.offsetWidth || 0) / 2;

      if (halfCardWidth < 0) {
        throw new Error(
          "The cardwidth is smaller than zero, the card won't work as expected!"
        );
      }

      const boundary = deckWidth - halfCardWidth;

      let rotation = (mx / boundary) * MAX_ROTATION;

      const clampedX = Math.min(Math.max(mx, -boundary), boundary);
      const clampedRot = Math.min(
        Math.max(rotation, -MAX_ROTATION),
        MAX_ROTATION
      );
      const trigger = vx > VELOCITY_THRESHOLD;

      if (!active && trigger) {
        api.start(() => {
          console.log("start reached!");
          const x = FLY_RANGE * xDir;

          return {
            x,
            opacity: 0,
          };
        });
      } else {
        api({
          x: active ? clampedX : 0,
          immediate: true,
          rotateZ: active ? clampedRot : 0,
          scale: active ? 1.1 : 1,
        });
      }
    }
  );

  return (
    <>
      <animated.div
        {...bind()}
        className={classname}
        ref={ref}
        style={{
          touchAction: "none",
          x,
          rotateZ,
          scale,
          opacity,
        }}
      >
        {children}
      </animated.div>
      <button onClick={reset} className="fixed top-3/4">
        Reset
      </button>
    </>
  );
});

SwipeCard.displayName = "SwipeCard";

export default SwipeCard;

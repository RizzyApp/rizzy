import { useSpring, animated, to } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { forwardRef } from "react";

const VELOCITY_THRESHOLD = 0.1;
const MAX_ROTATION = 45;

const SwipeCard = forwardRef(({ children, classname, deckWidth }, ref) => {
  const [{ x, rotateZ, scale }, api] = useSpring(() => ({
    x: 0,
    rotateZ: 0,
    scale: 1,
  }));

  const reset = () => {
    //for debugging purposes
    api.set({ x: 0, rotateZ: 0, scale: 1 });
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
          const x = (200 + window.innerWidth) * xDir;

          return {
            x,
            rotateZ: 90,
          };
        });
      } else {
        api.start({
          x: active ? clampedX : 0,
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
        }}
      >
        {children}
      </animated.div>
      <button onClick={reset}>Reset</button>
    </>
  );
});

SwipeCard.displayName = "SwipeCard";

export default SwipeCard;

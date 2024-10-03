import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { forwardRef } from "react";

const VELOCITY_THRESHOLD = 0.1;
const MAX_ROTATION = 45;

const SwipeCard = forwardRef(({ children, classname, deckWidth }, ref) => {
  const [{ x, rotateZ }, api] = useSpring(() => ({ x: 0, rotateZ: 0 }));

  const reset = () => {
    api.set({x: 0, rotateZ: 0})
  }

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], direction: [xDir] }) => {
      const halfCardWidth = (ref.current?.offsetWidth || 0) / 2;
      const boundary = deckWidth - halfCardWidth;

      let rotation = (mx / boundary) * MAX_ROTATION;

      const clampedX = Math.min(Math.max(mx, -boundary), boundary);
      const clampedRot = Math.min(
        Math.max(rotation, -MAX_ROTATION),
        MAX_ROTATION
      );
      const trigger = vx > VELOCITY_THRESHOLD;

      if (!active && trigger) {
        api.start((i) => {
          console.log("start reached!");
          const x = (200 + window.innerWidth) * xDir;

          return {
            x,
            rotateZ: 90,
          };
        });
      } else {
        api({
          x: active ? clampedX : 0,
          immediate: active,
          rotateZ: active ? clampedRot : 0,
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

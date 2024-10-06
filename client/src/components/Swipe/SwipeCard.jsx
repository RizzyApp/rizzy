import { useSpring, animated, config, to } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { forwardRef } from "react";

const VELOCITY_THRESHOLD = 0.1;
const MAX_ROTATION = 45;
const FLY_RANGE = 300;

const calculateTrigger = (vx, mx, boundary) => {
  return vx > VELOCITY_THRESHOLD || Math.abs(mx) >= boundary;
};

const calculateMovementAndBoundary = (mx, halfCardWidth, deckWidth) => {
  const boundary = deckWidth - halfCardWidth;

  const clampedX = Math.min(Math.max(mx, -boundary), boundary);

  return { clampedX, boundary };
};

const handleAnimation = (api, trigger, active, xDir, mx, boundary) => {
  if (!active && trigger) {
    let actualDir = xDir;
    if (Math.abs(mx) >= boundary) {
      actualDir = mx > 0 ? 1 : -1;
    }

    api.start(() => {
      const x = FLY_RANGE * actualDir;
      return { x, opacity: 0 };
    });
  } else {
    if (active) {
      api.start({
        x: mx,
        rotateZ: (mx / boundary) * MAX_ROTATION,
        immediate: true,
        scale: 1.1,
      });
    } else {
      api.start({
        x: 0,
        rotateZ: 0,
        scale: 1,
        config: config.slow,
      });
    }
  }
};

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
    ({ event, active, movement: [mx], velocity: [vx], direction: [xDir] }) => {
      event.preventDefault();
      const halfCardWidth = (ref.current?.offsetWidth || 0) / 2;

      if (halfCardWidth < 0) {
        throw new Error(
          "The card width is smaller than zero, the card won't work as expected!"
        );
      }

      const { clampedX, boundary } = calculateMovementAndBoundary(
        mx,
        halfCardWidth,
        deckWidth
      );

      const trigger = calculateTrigger(vx, mx, boundary);

      handleAnimation(api, trigger, active, xDir, clampedX, boundary);
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
          opacity,
          scale,
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

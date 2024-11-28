import { useState, useRef } from "react";
import { useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const VELOCITY_THRESHOLD = 0.1;
const MAX_ROTATION = 20;
const FLY_RANGE = 500;
const IS_DEVELOPMENT = import.meta.env.DEV;


const shouldTriggerFlyOut = (vx, mx, dir, boundary, reversedDirection) => {

  if (reversedDirection) return false;

  if (dir === 0 && Math.abs(mx) >= boundary) {
    return true;
  }
  if ((mx < 0 && dir !== -1) || (mx > 0 && dir !== 1)) {
    return false;
  }
  return vx > VELOCITY_THRESHOLD || Math.abs(mx) >= boundary;
};

const hasDirectionReversed = (currentMx, prevMx) => {
  if (Math.abs(currentMx) < Math.abs(prevMx)) {
    return true;
  }
  return false;
}


const hasKeptDirection = (currentMx, prevMx) => {
  if (Math.abs(currentMx) > Math.abs(prevMx)) {
    return true;
  }
  return false;
}

const calculateMovementAndBoundary = (mx, halfCardWidth, deckWidth) => {
  const boundary = deckWidth - halfCardWidth;
  const clampedX = Math.min(Math.max(mx, -boundary), boundary);
  return { clampedX, boundary };
};

const useSwipeAnimationHandler = (deckWidth, onSwipeOut, cardImageRef) => {
  const [swipeDebugInfo, setSwipeDebugInfo] = useState({
    clampedX: 0,
    currentMx: 0,
    previousMx: 0,
    rotation: 0,
    velocity: 0,
    direction: 0,
    isDirectionReversed: false,
    trigger: false,
  });

  const [{ x, rotateZ, scale, opacity }, dragApi] = useSpring(() => ({
    x: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
  }));

  const [{ y }, scrollApi] = useSpring(() => ({ y: 0 }));

  const prevMxRef = useRef(0);
  const reversedDirectionRef = useRef(false);


  const updateDirectionReversedRef = (currentMx) => {
    const prevMx = prevMxRef.current;
    const currentReversedDirectionState = hasDirectionReversed(currentMx, prevMx);

    prevMxRef.current = currentMx;

    if (hasDirectionReversed(currentMx, prevMx) || hasKeptDirection(currentMx, prevMx)) {
      reversedDirectionRef.current = currentReversedDirectionState;
    }
  }

  const bind = useGesture(
    {
      onDrag: ({
        event,
        active,
        movement: [mx],
        velocity: [vx],
        direction: [xDir],
      }) => {
        event.preventDefault();
        const halfCardWidth = deckWidth / 2; // Simplified
        if (halfCardWidth < 0) {
          throw new Error("The card width is smaller than zero!");
        }

        const { clampedX, boundary } = calculateMovementAndBoundary(mx, halfCardWidth, deckWidth);

        updateDirectionReversedRef(mx);

        const trigger = shouldTriggerFlyOut(vx, mx, xDir, boundary, reversedDirectionRef.current);

        if (IS_DEVELOPMENT) {
          setSwipeDebugInfo({
            clampedX: clampedX,
            currentMx: mx,
            previousMx: prevMxRef.current,
            rotation: (clampedX / boundary) * MAX_ROTATION,
            velocity: vx,
            direction: xDir,
            isDirectionReversed: reversedDirectionRef.current,
            trigger: trigger,
          });
        }

        // Handle dragging animation
        if (active) {
          dragApi.start({
            x: clampedX,
            rotateZ: (clampedX / boundary) * MAX_ROTATION,
            opacity: 1,
            scale: 1.1,
            config: { friction: 50, tension: 800 },
          });
        } else if (!active && trigger) {
          // Trigger fallout animation
          dragApi.start({
            x: FLY_RANGE * (mx > 0 ? 1 : -1),
            rotateZ: (clampedX / boundary) * MAX_ROTATION,
            opacity: 0,
            onRest: () => {
              onSwipeOut(mx > 0 ? 1 : -1)
            }, // Callback when the fallout animation finishes
          });
        } else {
          // Reset animation if not swiping out
          dragApi.start({ x: 0, rotateZ: 0, scale: 1, opacity: 1, config: { friction: 50, tension: 800 } });
        }
      },

      onWheelEnd: ({ direction: [_, yDir] }) => {
        const scrollHeight = cardImageRef.current.clientHeight;
        if (yDir === 1) {
          scrollApi.start({ y: -scrollHeight, config: { friction: 60 } },
          );
        } else if (yDir === -1) {
          scrollApi.start({ y: 0, config: { friction: 60 } });
        }
      },
      onHover: ({ active }) => {
        if (active) {
          dragApi.start({ scale: 1.05 })
        } else {
          dragApi.start({ scale: 1.0 })
        }
      }
    },
    { drag: { preventScroll: true } }
  );


  const reset = () => {
    dragApi.set({ x: 0, rotateZ: 0, scale: 1, opacity: 1 });
    scrollApi.set({ y: 0 })
    prevMxRef.current = 0;
    reversedDirectionRef.current = false;
  };

  const animatedStyles = { x, rotateZ, scale, opacity };

  return {
    bind,
    swipeDebugInfo,
    reset,
    animatedStyles,
    y
  };
};

export default useSwipeAnimationHandler;
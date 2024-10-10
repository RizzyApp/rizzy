import { useState } from "react";
import { useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const VELOCITY_THRESHOLD = 0.1;
const MAX_ROTATION = 20;
const FLY_RANGE = 300;

const calculateTrigger = (vx, mx, dir, boundary) => {
  if ((mx < 0 && dir !== -1) || (mx > 0 && dir !== 1)) {
    return false;
  }
  return vx > VELOCITY_THRESHOLD || Math.abs(mx) >= boundary;
};

const calculateMovementAndBoundary = (mx, halfCardWidth, deckWidth) => {
  const boundary = deckWidth - halfCardWidth;
  const clampedX = Math.min(Math.max(mx, -boundary), boundary);
  return { clampedX, boundary };
};

const useAnimation = (deckWidth, onSwipeOut) => {
  const [debugInfo, setDebugInfo] = useState({
    mx: 0,
    rotation: 0,
    velocity: 0,
    direction: 0,
    trigger: false,
  });

  const [{ x, rotateZ, scale, opacity }, api] = useSpring(() => ({
    x: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
  }));

  const bind = useDrag(
    ({
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
      const trigger = calculateTrigger(vx, mx, xDir, boundary);

      setDebugInfo({
        mx: clampedX,
        rotation: (clampedX / boundary) * MAX_ROTATION,
        velocity: vx,
        direction: xDir,
        trigger: trigger,
      });

      // Handle dragging animation
      if (active) {
        api.start({
          x: clampedX,
          rotateZ: (clampedX / boundary) * MAX_ROTATION,
          scale: 1.1,
          opacity: 1,
          config: { friction: 50, tension: 800 },
        });
      } else if (!active && trigger) {
        // Trigger fallout animation
        api.start({
          x: FLY_RANGE * xDir,
          rotateZ: (clampedX / boundary) * MAX_ROTATION,
          opacity: 0,
          onRest: onSwipeOut, // Callback when the fallout animation finishes
        });
      } else {
        // Reset animation if not swiping out
        api.start({ x: 0, rotateZ: 0, scale: 1, opacity: 1, config: { friction: 50, tension: 800 } });
      }
    }
  );

  const reset = () => {
    // For debugging purposes
    api.set({ x: 0, rotateZ: 0, scale: 1, opacity: 1 });
  };

  // Combine all animated styles into one object
  const animatedStyles = { x, rotateZ, scale, opacity };

  return {
    bind,
    debugInfo,
    reset,
    animatedStyles,
  };
};

export default useAnimation;
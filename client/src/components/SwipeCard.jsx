import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { forwardRef } from "react";



const SwipeCard = forwardRef(({ children, classname, deckWidth }, ref) => {
  const [{ x, rotateZ }, api] = useSpring(() => ({ x: 0, rotateZ: 0 }));


  const bind = useDrag(({active, movement: [mx], cancel, distance}) => {
    const halfCardWidth = (ref.current?.offsetWidth || 0) / 2;
    const boundary = deckWidth - halfCardWidth
    const maxRotation = 45;

    let rotation = (mx / boundary) * maxRotation;
    console.log(distance)

    const clampedX = Math.min(Math.max(mx, -boundary), boundary);
    const clampedRot = Math.min(Math.max(rotation, -maxRotation), maxRotation);

    if(Math.abs(mx) >= boundary){
      console.log(mx);
      console.log(boundary);
        }

    // Update the spring position
    api({ x: active ? clampedX : 0, immediate: active, rotateZ: active? clampedRot : 0 });
  });

  return (
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
  );
});

SwipeCard.displayName = "SwipeCard";

export default SwipeCard;

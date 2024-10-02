import {useSpring, animated} from "@react-spring/web";
import {useDrag} from "@use-gesture/react";
import { forwardRef } from "react";





const SwipeCard = forwardRef(({children, classname, deckWidth}, ref) => {
    const [{ x, rotate }, set] = useSpring(() => ({ x: 0, rotate: 0 }));
  

    const bind = useDrag((state) => {
        const offsetX = state.offset[0];
        const halfCardWidth = (ref.current?.offsetWidth || 0) / 2; 

        // Calculate boundaries
        const minX = -deckWidth + halfCardWidth; 
        const maxX = halfCardWidth; 

        // Clamp the x value to keep the card within boundaries
        const clampedX = Math.min(Math.max(offsetX, minX), maxX);

        const rotation = (offsetX / halfCardWidth) * 45;

        // Update the spring position
        set({ x: clampedX, rotate: rotation });
    });
  
    return (
      <animated.div
        {...bind()} // bind the gesture to the div
        className={classname}
        ref={ref}
        style={{
          touchAction: 'none', 
            x,
            rotate: rotate.to((r) => `rotate(${r}deg`),
        }}
      >
         {children}
      </animated.div>
    );
  });

  SwipeCard.displayName = 'SwipeCard';
  
  export default SwipeCard;

import { forwardRef } from "react";
import { animated } from "@react-spring/web";

import SwipeCardImage from "./SwipeCardImage";
import SwipeCardBio from "./SwipeCardBio";

const SwipeCardContent = forwardRef(({ cardData, y, active }, ref) => {
  const transformFunc = active
    ? { transform: y.to((py) => `translateY(${py}px)`) }
    : null;

  return (
    <div
      className="relative w-96 h-card bg-gray-100 shadow-2xl rounded-2xl items-center justify-start cursor-grab select-none overflow-hidden"
      ref={ref}
    >
      <animated.div
        style={transformFunc}
        className="flex flex-col m-5 min-h-full"
      >
        <SwipeCardImage src={cardData.src} />
        <SwipeCardBio name={cardData.name} bio={cardData.bio} />
      </animated.div>
    </div>
  );
});

SwipeCardContent.displayName = "SwipeCardContent";

export default SwipeCardContent;

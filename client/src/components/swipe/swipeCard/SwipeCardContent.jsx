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
      className={`relative h-card-big aspect-4/5 bg-chat-backgroundPrimary shadow-2xl rounded-2xl items-center justify-start cursor-grab select-none overflow-hidden`}
      ref={ref}
    >
      <animated.div
        style={transformFunc}
        className="flex flex-col m-5 min-h-full"
      >
        <SwipeCardImage cardData={cardData}/>
        <SwipeCardBio cardData={cardData} />
      </animated.div>
    </div>
  );
});

SwipeCardContent.displayName = "SwipeCardContent";

export default SwipeCardContent;

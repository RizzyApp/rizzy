import { forwardRef } from "react";
import { animated } from "@react-spring/web";

import CardImage from "./CardImage";
import CardBio from "./CardBio";

const CardContent = forwardRef(({ data, y, active }, ref) => {
  const transformFunc = active
    ? { transform: y.to((py) => `translateY(${py}px)`) }
    : null;

  return (
    <div className="relative w-80 h-[450px] bg-gray-100 shadow-2xl rounded-2xl items-center justify-start cursor-grab select-none overflow-hidden">
      <animated.div
        style={transformFunc}
        className="flex flex-col m-5 min-h-full"
      >
        <CardImage src={data.src} ref={ref} />
        <CardBio name={data.name} bio={data.bio} />
      </animated.div>
    </div>
  );
});

CardContent.displayName = "CardContent";

export default CardContent;

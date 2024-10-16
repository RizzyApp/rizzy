import React, { useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import CardImage from "./CardImage";
import CardBio from "./CardBio";

function CardContent({ src, name, bio }) {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const scrollRef = useRef(null);

  useGesture(
    {
      onWheel: ({ movement: [, my], memo = y.get() }) => {
        console.log(y);
        const scrollHeight =
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        const nextY = Math.max(Math.min(memo + my, 0), -scrollHeight);
        api.start({ y: nextY });
        return memo;
      },
    },
    { target: scrollRef, eventOptions: { passive: false } }
  );

  return (
    <div className="relative w-80 h-[450px] bg-gray-100 shadow-2xl rounded-2xl items-center justify-start cursor-grab select-none overflow-hidden">
      <animated.div
        ref={scrollRef}
        style={{ transform: y.to((py) => `translateY(${py}px)`) }}
        className="flex flex-col m-5 min-h-full"
      >
        <CardImage src={src} />
        <CardBio name={name} bio={bio} />
      </animated.div>
    </div>
  );
}

export default CardContent;

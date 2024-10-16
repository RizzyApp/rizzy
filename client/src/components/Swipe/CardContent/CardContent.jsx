import { useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import CardImage from "./CardImage";
import CardBio from "./CardBio";

function CardContent({ data, animatedDivRef }) {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const imageDivRef = useRef(null);
  useGesture(
    {
      onWheel: ({ movement: [, my], memo = y.get() }) => {
        console.log(memo);
        const scrollHeight = imageDivRef.current.scrollHeight;
        const nextY = Math.max(Math.min(memo + my, 0), -scrollHeight);
        api.start({ y: nextY });
        return memo;
      },
    },
    { target: animatedDivRef, eventOptions: { passive: false } }
  );

  console.log(data);

  return (
    <div className="relative w-80 h-[450px] bg-gray-100 shadow-2xl rounded-2xl items-center justify-start cursor-grab select-none overflow-hidden">
      <animated.div
        style={{ transform: y.to((py) => `translateY(${py}px)`) }}
        className="flex flex-col m-5 min-h-full"
      >
        <CardImage src={data.src} ref={imageDivRef} />
        <CardBio name={data.name} bio={data.bio} />
      </animated.div>
    </div>
  );
}

export default CardContent;

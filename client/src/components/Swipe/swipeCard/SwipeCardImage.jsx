import { forwardRef } from "react";
import {swipeCardImageAspectRatioClassName} from "../../../constants.js";

const SwipeCardImage = forwardRef(({ src }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative flex bg-gray-200 h-card ${swipeCardImageAspectRatioClassName}`}
    >
      <img
        className="h-full w-full object-cover rounded-xl pointer-events-none"
        src={src}
        alt=""
      />
    </div>
  );
});

SwipeCardImage.displayName = "SwipeCardImage";

export default SwipeCardImage;

import { forwardRef } from "react";

const SwipeCardImage = forwardRef(({ src }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex-shrink-0 flex justify-center items-center bg-gray-200 h-card"
    >
      <img
        className="h-auto object-contain rounded-xl pointer-events-none"
        src={src}
        alt=""
      />
    </div>
  );
});

SwipeCardImage.displayName = "SwipeCardImage";

export default SwipeCardImage;

import { forwardRef } from "react";

const SwipeCardImage = forwardRef(({ src }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex-shrink-0 flex justify-center items-center bg-gray-200 h-[450px]"
    >
      <img
        className="w-4/5 h-auto object-contain rounded-xl pointer-events-none"
        src={src}
        alt="" // Adding alt for accessibility; you might want to add a proper description
      />
    </div>
  );
});

SwipeCardImage.displayName = "SwipeCardImage";

export default SwipeCardImage;

import React from "react";

function CardImage({ src }) {
  return (
    <div className="relative flex-shrink-0 flex justify-center items-center bg-gray-200 h-[450px] ">
      <img
        className="w-4/5 h-auto object-contain rounded-xl pointer-events-none"
        src={src}
      />
    </div>
  );
}

export default CardImage;

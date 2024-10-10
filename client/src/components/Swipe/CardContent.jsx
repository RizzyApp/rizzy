import React from "react";

function CardContent({ src }) {
  return (
    <div className="relative z-[2] w-60 h-[400px] bg-white border rounded-lg flex items-center justify-center cursor-grab overflow-hidden">
      <img className="w-36 h-full object-cover pointer-events-none" src={src} />
    </div>
  );
}

export default CardContent;

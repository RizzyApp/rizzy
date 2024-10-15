import React from "react";

function CardContent({ src, name, bio }) {
  return (
    <div className="relative w-80 h-[450px] bg-gray-100 shadow-2xl rounded-2xl items-center justify-start cursor-grab select-none">
      <div className="flex flex-col h-full m-5 overflow-y-scroll">
        <div className="relative flex-shrink-0 flex justify-center items-center bg-gray-200 h-[450px] ">
          <img
            className="w-4/5 h-auto object-contain rounded-xl pointer-events-none"
            src={src}
          />
        </div>

        <div className="h-[120px] p-4 bg-white text-center">
          <h3 className="font-bold text-lg mb-2">{name}</h3>
          <p className="text-sm text-gray-700">{bio}</p>
        </div>
      </div>
    </div>
  );
}

export default CardContent;

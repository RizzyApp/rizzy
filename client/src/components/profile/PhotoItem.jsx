import React, {useState, useRef, useEffect} from "react";

import pictureUpload from "../../assets/picture_upload_icon.png";

const enabledClassname = "cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300";
const notEnabledClassname = "opacity-50"


const PhotoItem = ({index, image, isEnabled, onClick, isEditing, children }) => {
    
    return (
        <div
            className={`photo-item relative flex items-center justify-center aspect-[4/5] bg-gray-200 
            border-2 text-black border-gray-300 rounded-lg ${isEditing ? isEnabled ? enabledClassname : notEnabledClassname: ""}`}
            onClick={onClick}
        >
            {image ? (
                <img
                    className="user-picture w-full h-full object-cover"
                    src={image}
                    alt={`UserPicture-${index}`}
                />
            ) : (
                <img className="sample w-16" src={pictureUpload} alt="Upload Icon"/>
            )}
            {children}
        </div>
    );
};

export default PhotoItem;
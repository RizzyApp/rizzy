import React, { useState, useEffect } from "react";
import pictureUpload from "../assets/picture_upload_icon.png";
import deleteIcon from "../assets/delete-icon.png";

const PhotoGallery = ({ photos }) => {
  const [images, setImages] = useState([null, null, null, null, null, null]);
  const [isUrl, setIsUrl] = useState(false);
  const [showOptions, setShowOptions] = useState(null);
  const [clickedOutside, setClickedOutside] = useState(false);

  if (images) console.log(images);

  useEffect(() => {
    if (photos) setImages(photos);
  }, [photos]);

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".photo-item")) {
      setShowOptions(null);
    }
  };

  useEffect(() => {
    if (clickedOutside) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [clickedOutside]);

  const handleOnClick = (index) => {
    setClickedOutside(true);
    setShowOptions(index);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
        setShowOptions(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = (index, e) => {
    const url = e.target.value;
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
    setShowOptions(null);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4 bg-custom-gradient rounded-lg mt-5">
      {images.map((image, index) => (
        <div
          key={index}
          className="photo-item flex items-center justify-center aspect-[4/5] bg-gray-200 border-2 text-black border-gray-300 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300 relative"
          onClick={() => handleOnClick(index)}
        >
          {image ? (
            <img
              className="user-picture w-full h-full object-cover"
              src={image}
              alt={`UserPicture-${index}`}
            />
          ) : (
            <img
              className="sample w-16"
              src={pictureUpload}
              alt="Upload Icon"
            />
          )}

          {image && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImageDelete(index);
              }}
              className="absolute w-12 top-2 right-2 bg-white p-0 rounded-full"
            >
              <img src={deleteIcon} />
            </button>
          )}

          <input
            type="file"
            id={`fileInput-${index}`}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(index, e)}
          />

          {showOptions === index && (
            <div className="absolute bottom-0 left-0 w-full p-4 bg-custom-gradient bg-opacity-80 text-black flex flex-col items-center space-y-2 rounded-b-lg">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`uploadOrUrl-${index}`}
                  checked={!isUrl}
                  onChange={() => setIsUrl(false)}
                />
                <span>Upload Image</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`uploadOrUrl-${index}`}
                  checked={isUrl}
                  onChange={() => setIsUrl(true)}
                />
                <span>Enter Image URL</span>
              </label>

              {isUrl && (
                <input
                  type="text"
                  placeholder="Enter image URL"
                  className="text-black bg-white border p-2 rounded"
                  onChange={(e) => handleImageUrl(index, e)}
                />
              )}

              {!isUrl && (
                <button
                  onClick={() =>
                    document.getElementById(`fileInput-${index}`).click()
                  }
                  className="px-6 py-3 text-center bg-transparent text-white border-white rounded-full hover:bg-buttonHover"
                >
                  Select Image to Upload
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;

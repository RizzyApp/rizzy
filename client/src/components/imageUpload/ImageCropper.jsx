import {useEffect, useState} from 'react'
import Cropper from 'react-easy-crop'
import SwipeCardContent from "../swipe/swipeCard/SwipeCardContent.jsx";
import getCroppedImg from "./utils/getCroppedImg.js";
import {swipeCardImageAspectRatioNum} from "../../constants.js";

const cardData = {
    id: 1,
    name: "Mr.Bean",
    src: "./image/bean-1.jpg",
    bio: "This is a very cool bio",
};


function ImageCropper({imageSrc, onCropComplete, onCancel}) {
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [previewImage, setPreviewImage] = useState(null);
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
         getCroppedImg(imageSrc, croppedAreaPixels)
             .then((croppedImage) => setPreviewImage(croppedImage));

    };

    const onCrop = () => {
        onCropComplete(croppedAreaPixels);
    }

    useEffect(() => {
        cardData.src = previewImage;
    }, [previewImage]);

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-custom-gradient "></div>
            <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-[80px]">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={swipeCardImageAspectRatioNum}
                        onCropChange={setCrop}
                        onCropComplete={handleCropComplete}
                        onZoomChange={setZoom}
                    />
                <div className="fixed right-0">
                    <SwipeCardContent cardData={cardData}></SwipeCardContent>
                </div>

            </div>
            <div className="fixed bottom-0 w-full h-[80px]">
                <button onClick={onCrop}>Crop</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>

    )
}

export default ImageCropper;
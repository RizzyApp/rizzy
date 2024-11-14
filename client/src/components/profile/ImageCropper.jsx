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
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
        getCroppedImg(imageSrc, croppedAreaPixels, rotation, zoom)
            .then((croppedImage) => cardData.src = croppedImage);
    };

    const onCropSave = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
        onCropComplete(croppedImage);
    }


    return (
        <div>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-custom-gradient "></div>
            <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-[80px]">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={swipeCardImageAspectRatioNum}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={handleCropComplete}
                    objectFit="contain"
                />
                {/*   <div className="fixed right-0">
                    <h2 className="text-xl text-white font-bold">Preview on Card</h2>
                    <SwipeCardContent cardData={cardData}></SwipeCardContent>
                </div>*/}
                {/*TODO: fix this swipeCard preview */}

            </div>
            <div className="fixed bottom-0 w-full h-[80px]">
                <div className="mb-2">
                    <label className="text-center text-white mx-1">Zoom</label>
                    <input type="range" min={1} max={3} step={0.1} value={zoom}
                           onInput={(e) => setZoom(Number(e.target.value))}/>
                    <label className="text-center text-white mx-1">Rotation</label>
                    <input type="range" min={0} max={360} step={1} value={rotation}
                           onInput={(e) => setRotation(Number(e.target.value))}/>
                </div>
                <button className="text-white" onClick={onCropSave}>Crop</button>
                <button className="text-white" onClick={onCancel}>Cancel</button>
            </div>
        </div>

    )
}

export default ImageCropper;
import {useState} from 'react'

import ImagePreview from "./ImagePreview.jsx";
import ImageCropper from "./ImageCropper.jsx";
import ImageUploader from "./ImageUploader.jsx";
import getCroppedImg from "./utils/cropImage.js";


function ImageUploadMain() {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Handle crop completion and set cropped image
    const handleCropComplete = async (croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        setCroppedImage(croppedImage);
        setIsEditing(false);
    };

    const onCancelEditImage = () => {
        setIsEditing(false);
    }

    const onImageSelect  = (img) => {
        setImage(img)
        setIsEditing(true);
        setCroppedImage(null);
    }


    return (
        <div>
            {!image ? (
                <ImageUploader onImageSelect={onImageSelect}/>
            ) : isEditing && (
                <ImageCropper imageSrc={image} onCropComplete={handleCropComplete} onCancel={onCancelEditImage}/>
            )}
            {croppedImage && <img src={croppedImage} alt="Cropped result"/>}
        </div>
    );
}

export default ImageUploadMain;
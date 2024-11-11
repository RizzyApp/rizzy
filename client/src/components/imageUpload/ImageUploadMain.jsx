import {useState} from 'react'

import ImagePreview from "./ImagePreview.jsx";
import ImageCropper from "./ImageCropper.jsx";
import ImageUploader from "./ImageUploader.jsx";
import getCroppedImg from "./utils/getCroppedImg.js";


function ImageUploadMain() {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleCropComplete = (croppedImage) => {
        setCroppedImage(croppedImage);
        setIsEditing(false);
    };

    const onCancelEditImage = () => {
        setIsEditing(false);
        if (croppedImage == null) {
            setCroppedImage(image);
        }
    }

    const onRemoveImage = () => {
        setCroppedImage(null);
        setImage(null);
    }

    const onImageSelect = (img) => {
        setImage(img)
        setIsEditing(true);
        setCroppedImage(null);
    }

    const onEdit = () => {
        setIsEditing(true);
    }

    const onUpload = () => {

    }


    return (
        <div>
            {!image ? (
                <ImageUploader onImageSelect={onImageSelect}/>
            ) : isEditing && (
                <ImageCropper imageSrc={image} onCropComplete={handleCropComplete} onCancel={onCancelEditImage}/>
            )}
            {croppedImage && <ImagePreview imageSrc={croppedImage} onCancel={onRemoveImage} onEdit={onEdit}
                                           onUpload={onUpload}/>}
        </div>
    );
}

export default ImageUploadMain;
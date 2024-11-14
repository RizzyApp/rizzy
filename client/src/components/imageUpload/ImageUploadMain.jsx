/*
import {useState} from 'react'

import ImagePreview from "./ImagePreview.jsx";
import ImageCropper from "./ImageCropper.jsx";
import ImageUploader from "./ImageUploader.jsx";
import dataURLtoBlob from "./utils/dataURLToBlob.js";
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
        const formData = new FormData();
        formData.append("image", dataURLtoBlob(croppedImage));
        const fetchOptions = {
            method: "POST",
            body: formData, 
        }

        fetch("/api/v1/Image", fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Image upload failed");
                }
                return response.json();
            })
            .then(data => {
                console.log("Image uploaded successfully:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
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

export default ImageUploadMain;*/

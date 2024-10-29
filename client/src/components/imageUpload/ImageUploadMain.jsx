import {useState} from 'react'

import ImagePreview from "./ImagePreview.jsx";
import ImageCropper from "./ImageCropper.jsx";
import ImageUploader from "./ImageUploader.jsx";


function ImageUploadMain() {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            {!image ? (
                <ImageUploader onImageSelect={setImage}/>
            ) : !isEditing ? (
                <ImagePreview imageSrc={image} onEdit={() => setIsEditing(true)} />
            ) : (
                <ImageCropper imageSrc={image}  />
            )}
            {croppedImage && <img src={croppedImage} alt="Cropped result" />}
        </div>
    );
}

export default ImageUploadMain;
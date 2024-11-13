import React, {useState, useRef} from "react";
import PhotoItem from "./PhotoItem";
import ImageCropper from "./ImageCropper.jsx";

const emptyImages = [null, null, null, null, null, null];


const PhotoGallery = ({isEditing, initialImages}) => {
    const filledImages = [...initialImages, ...emptyImages].slice(0, 6);
    const [images, setImages] = useState(filledImages);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    const inputRef = useRef(null);

    const updateImage = (index, newImage) => {
        const newImages = [...images];
        newImages[index] = newImage;
        setImages(newImages);
    }

    const handleSelection = (index) => {
        if (index === firstEmptyIndex) {
            console.log("I'm empty");
            inputRef.current.click();
        }

        console.log("hello");
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
                setIsCropping(true);
            };
            reader.onerror = () => {
                console.error("Oops something happened");
            }
            reader.readAsDataURL(file);
        }
    }; //TODO: Max file size check and notify the user if file upload failed

    const handleCropComplete = (croppedImage) => {
        setIsCropping(false);
        replaceFirstEmptyIndex(croppedImage);
    };

    const onCancelEditImage = () => {
        setIsCropping(false);
        replaceFirstEmptyIndex(uploadedImage);
    }

    const deleteImage = (index) => updateImage(index, null);

    const firstEmptyIndex = images.findIndex((image) => image === null);

    const replaceFirstEmptyIndex = (image) => updateImage(firstEmptyIndex, image);

    return (
        <>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4 bg-custom-gradient rounded-lg mt-5">
                {images.map((image, index) => {
                        if (!isEditing && image == null) {
                            return;
                        }
                        return (
                            <PhotoItem
                                key={index}
                                index={index}
                                image={image}
                                onImageUpdate={updateImage}
                                onDelete={deleteImage}
                                isEnabled={index === firstEmptyIndex || image !== null}
                                onClick={() => handleSelection(index)}
                            />
                        )
                    }
                )}
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                />
            </div>
            {isCropping && <ImageCropper imageSrc={uploadedImage} onCropComplete={handleCropComplete}
                                         onCancel={onCancelEditImage}/>}

        </>

    );
};

export default PhotoGallery;
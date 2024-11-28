import {useState, useRef, useEffect} from "react";
import PhotoItem from "./PhotoItem";
import ImageCropper from "./ImageCropper.jsx";
import deleteIcon from "../../assets/delete-icon.png";
import {UPLOAD_MAX_FILE_SIZE, UPLOAD_MAX_IMAGE_NUMBER} from "../../constants.js";
import useCustomToast from "../../hooks/useCustomToast.jsx";


const emptyImages = [null, null, null, null, null, null];

const isFileSizeValid = (file) => file.size <= UPLOAD_MAX_FILE_SIZE;

const fillUpImagesWithNull = (initialImages) => {
    return [...initialImages, ...emptyImages].slice(0, UPLOAD_MAX_IMAGE_NUMBER);
}

const PhotoGallery = ({isEditing, initialImages, setChangedPhotoUrls}) => {
    const [images, setImages] = useState(fillUpImagesWithNull(initialImages));
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const inputRef = useRef(null);
    const {showErrorToast} = useCustomToast();

    const AddImageToFirstEmptyTile = (newImage) => {
        const newImages = [...images];
        newImages[firstEmptyIndex] = newImage;
        setImages(newImages);
    }

    useEffect(() => {
         setImages(fillUpImagesWithNull(initialImages));
    }, [isEditing])
    
    const handleSelection = (index) => {
        if (index === firstEmptyIndex) {
            inputRef.current.click();
        }
        if (images[index] != null && isEditing) {
            setSelectedIndex(index);
        }

    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!isFileSizeValid(file)) {
                showErrorToast(`You can't upload images over ${UPLOAD_MAX_FILE_SIZE}`);
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
                setIsCropping(true);
            };
            reader.onerror = () => {
                showErrorToast("Oops an error occured during upload");
            }
            reader.readAsDataURL(file);
        }
    }; 

    const handleCropComplete = (croppedImage) => {
        setIsCropping(false);
        AddImageToFirstEmptyTile(croppedImage);
    };

    const onCancelEditImage = () => {
        setIsCropping(false);
    }

    const deleteImage = (index) => {
        if (images.filter(i => i != null).length <= 1) {
            showErrorToast("You must have one image!")
            return;
        }
        const deletedImage = images[index];
        if (!deletedImage) return;

        const newImages = images.filter((_, i) => i !== index);
        setSelectedIndex(null);
        setImages([...newImages, ...emptyImages].slice(0, UPLOAD_MAX_IMAGE_NUMBER));
    }

    const firstEmptyIndex = images.findIndex((image) => image === null);

    useEffect(() => {
        setChangedPhotoUrls(images.filter((image) => image !== null));
    }, [images, setChangedPhotoUrls]);

    return (
        <>{(images.length > 0 || isEditing) &&
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
                                isEnabled={index === firstEmptyIndex || image !== null}
                                onClick={() => handleSelection(index)}
                                isEditing={isEditing}
                            >
                                {image != null && isEditing && <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteImage(index);
                                    }}
                                    className="absolute w-12 top-2 right-2 bg-white p-0 rounded-full"
                                >
                                    <img src={deleteIcon} alt="delete icon"/>
                                </button>}
                            </PhotoItem>
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
        }

            {isCropping && <ImageCropper imageSrc={uploadedImage} onCropComplete={handleCropComplete}
                                         onCancel={onCancelEditImage}/>}

        </>

    );
};

export default PhotoGallery;
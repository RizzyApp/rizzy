import {useState, useRef, useEffect} from "react";
import PhotoItem from "./PhotoItem";
import ImageCropper from "./ImageCropper.jsx";
import deleteIcon from "../../assets/delete-icon.png";
import {UPLOAD_MAX_FILE_SIZE, UPLOAD_MAX_IMAGE_NUMBER} from "../../constants.js";


const emptyImages = [null, null, null, null, null, null];

const  isFileSizeValid = (file) => file.size <= UPLOAD_MAX_FILE_SIZE;




const PhotoGallery = ({isEditing, initialImages, setChangedPhotoUrls}) => {
    const filledInitialImages = [...initialImages, ...emptyImages].slice(0, UPLOAD_MAX_IMAGE_NUMBER);
    const [images, setImages] = useState(filledInitialImages);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const inputRef = useRef(null);

    const AddImageToFirstEmptyTile = (newImage) => {
        const newImages = [...images];
        newImages[firstEmptyIndex] = newImage;
        setImages(newImages);
    }

    const handleSelection = (index) => {
        if (index === firstEmptyIndex) {
            console.log("I'm empty");
            inputRef.current.click();
        }
        if (images[index] != null && isEditing) {
            setSelectedIndex(index);
        }

        console.log("hello");
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if(!isFileSizeValid(file)){
                console.error("Invalid file size");
                return;
            }
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
    //TODO: Maybe add a warning if the resolution is too small

    const handleCropComplete = (croppedImage) => {
        setIsCropping(false);
        AddImageToFirstEmptyTile(croppedImage);
    };

    const onCancelEditImage = () => {
        setIsCropping(false);
    }

    const deleteImage = (index) => {
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
            {isCropping && <ImageCropper imageSrc={uploadedImage} onCropComplete={handleCropComplete}
                                         onCancel={onCancelEditImage}/>}

        </>

    );
};

export default PhotoGallery;
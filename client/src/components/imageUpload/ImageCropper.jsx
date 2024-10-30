import {useState} from 'react'
import Cropper from 'react-easy-crop'

function ImageCropper({imageSrc, onCropComplete, onCancel}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onCrop = () => {
        onCropComplete(croppedAreaPixels);
    }

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-custom-gradient"></div>
            <div className="fixed top-0 left-0 right-0 bottom-[80px]">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={handleCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="fixed bottom-0 w-full h-[80px]">
                <button onClick={onCrop}>Crop</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>

    )
}

export default ImageCropper;
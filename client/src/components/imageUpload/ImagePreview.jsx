import {swipeCardImageAspectRatioClassName} from "../../constants.js";

function ImagePreview({ imageSrc, onEdit, onUpload, onCancel }) {
    return (
        <div className="ml-4 mt-4">
            <div className={`h-card-big ${swipeCardImageAspectRatioClassName} border-4 border-black`}>
                <img className="object-cover h-full w-full" src={imageSrc} alt="Preview"/>
            </div>
            <div>
                <button className="text-white" onClick={onCancel}>Remove</button>
                <button className="text-white" onClick={onEdit}>Edit</button>
                <button className="text-white" onClick={onUpload}>Upload (WIP)</button>
            </div>
        </div>

    );
}

export default ImagePreview;
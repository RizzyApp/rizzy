function ImagePreview({ imageSrc, onEdit }) {
    return (
        <div>
            <img src={imageSrc} alt="Preview" style={{ maxWidth: "100%" }} />
            <button onClick={onEdit}>Edit</button>
        </div>
    );
}

export default ImagePreview;
function ImageUploader({ onImageSelect }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => onImageSelect(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />;
}

export default ImageUploader
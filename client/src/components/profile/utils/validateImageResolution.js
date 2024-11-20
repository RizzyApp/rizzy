const  validateImageResolution = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width <= maxWidth && img.height <= maxHeight) {
                resolve(true);
            } else {
                resolve(false);
            }
            URL.revokeObjectURL(url); // Clean up
        };

        img.onerror = (err) => {
            reject(err);
        };

        img.src = url;
    });
}

export default validateImageResolution;
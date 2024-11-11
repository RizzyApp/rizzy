/**
 * Converts a Base64 dataURL to a Blob object.
 *
 * @param {string} dataurl - The Base64 dataURL to convert.
 * @returns {Blob} - A Blob representing the binary data of the image, with the appropriate MIME type.
 */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
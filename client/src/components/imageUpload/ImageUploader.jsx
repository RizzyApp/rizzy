import React, {useCallback, useMemo } from 'react';
import PlusIcon from '../../assets/plus-icon.svg';
import {useDropzone} from "react-dropzone";

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px',
    borderWidth: 4,
    borderRadius: '10%',
    borderColor: 'rgba(255,255,255,0.5)',
    borderStyle: 'solid',
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff002f'
};

function ImageUploader({ onImageSelect }) {

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const binaryStr = reader.result
                onImageSelect(binaryStr);
            }
            reader.readAsDataURL(file);
        })

    }, [onImageSelect]);

    const {getRootProps, getInputProps, isFocused, isDragAccept, isDragReject} = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'], 'image/jpeg': ['.jpg'],
        }});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);


    return(
        <div className="w-32 h-52">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p className="text-blue-500">Upload Image</p>
            </div>
        </div>
    )
}

export default ImageUploader
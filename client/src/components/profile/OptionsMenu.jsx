import React, {useState, forwardRef} from "react";

const OptionsMenu = forwardRef(({onFileUpload, onUrlInput}, ref) => {
    const [isUrl, setIsUrl] = useState(false);

    return (
        <div
            ref={ref}
            className="absolute bottom-0 left-0 w-full p-4 bg-custom-gradient bg-opacity-80 text-black flex flex-col items-center space-y-2 rounded-b-lg"
        >
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="uploadOrUrl"
                    checked={!isUrl}
                    onChange={() => setIsUrl(false)}
                />
                <span>Upload Image</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="uploadOrUrl"
                    checked={isUrl}
                    onChange={() => setIsUrl(true)}
                />
                <span>Enter Image URL</span>
            </label>

            {isUrl ? (
                <input
                    type="text"
                    placeholder="Enter image URL"
                    className="text-black bg-white border p-2 rounded"
                    onChange={(e) => onUrlInput(e.target.value)}
                />
            ) : (
                <>A</>
            )}

        </div>
    );
});

OptionsMenu.displayName = "OptionsMenu";

export default OptionsMenu;

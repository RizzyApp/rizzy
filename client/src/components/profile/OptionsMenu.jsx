import React from 'react';

const OptionsMenu = ({onDelete}) => {
    return (
        <div
            className="absolute bottom-0 left-0 w-full p-4 bg-custom-gradient bg-opacity-80 text-black 
            flex flex-col items-center space-y-2 rounded-b-lg">
            <button
                className="px-6 py-3 text-center bg-transparent text-white border-white rounded-full hover:bg-buttonHover"
                onClick={onDelete}>Delete
            </button>

        </div>
    );
};

export default OptionsMenu;

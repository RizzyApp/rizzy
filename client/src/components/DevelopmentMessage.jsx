import React from 'react';

const DevelopmentMessage = () => {
    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <div className="font-bold text-gray-700">For Development:</div>
            <div className="mt-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="ml-2 text-blue-600 font-mono">test@gmail.com</span>
            </div>
            <div className="mt-1">
                <span className="font-medium text-gray-600">Password:</span>
                <span className="ml-2 text-blue-600 font-mono">test123</span>
            </div>
        </div>

    );
};

export default DevelopmentMessage;
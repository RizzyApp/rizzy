import {useState} from "react";

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="p-4 border-t flex items-center">
            <input
                type="text"
                placeholder="Aa"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-3 border rounded-lg focus:outline-none"
            />
            <button
                onClick={handleSendMessage}
                className="ml-2 p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                aria-label="Send"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
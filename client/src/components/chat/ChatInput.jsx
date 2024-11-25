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
        <div className="p-4 border-t border-border-primary flex items-center">
            <textarea
                type="text"
                placeholder="Aa"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-3 border border-border-secondary  bg-input-background text-input-text placeholder-input-placeholder rounded-lg focus:outline-none resize-none overflow-hidden"
                rows={1}
            />
            <button
                onClick={handleSendMessage}
                className="ml-2 p-3 bg-button-background text-text-contrast rounded-lg hover:bg-button-hover transition-colors"
                aria-label="Send"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
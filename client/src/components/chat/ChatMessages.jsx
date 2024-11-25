import {useEffect, useRef} from "react";

const ChatMessages = ({messages, otherUserId}) => {

    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
                <div
                    key={message.messageId}
                    className={`mb-4 ${
                        message.senderId === Number(otherUserId) ?  "" : "flex justify-end"
                    }`}
                >
                    <p
                        className={`inline-block max-w-xl text-lg p-3 rounded-lg ${
                            message.senderId === otherUserId
                                ? "text-gray-700 bg-pink-100"
                                : "text-white bg-pink-400"
                        }`}
                    >
                        <span className="max-w-full break-words">{message.content}</span>
                    </p>
                </div>
            ))}
            <div ref={messageEndRef}/>
        </div>
    );
};

export default ChatMessages;
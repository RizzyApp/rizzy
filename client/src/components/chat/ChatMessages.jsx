import {useEffect, useRef} from "react";
import dateConverter from "./utils/dateConverter.js";

const ChatMessages = ({messages, selectedUser}) => {

    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center justify-center p-4  border-b-border-primary text-text-secondary mb-3">
                {`Matched with ${selectedUser.name} ${dateConverter(selectedUser.matchDate, "")}`}
            </div>
            {messages && messages.map((message) => (
                <div
                    key={message.messageId}
                    className={`mb-4 ${
                        message.senderId === Number(selectedUser.userId) ? "" : "flex justify-end"
                    }`}
                >
                    <p
                        className={`inline-block max-w-xl text-lg p-3 rounded-lg ${
                            message.senderId === selectedUser.userId
                                ? "text-chat-textReceived bg-chat-bubbleReceived"
                                : "text-chat-textSent bg-chat-bubbleSent"
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
import React from 'react';
import ChatWindow from "../components/chat/ChatWindow.jsx";
import Header from "../components/Header.jsx";

const ChatPage = () => {
    return (
        <div className="h-screen overflow-hidden">
            <Header/>
            <div className="flex flex-col items-center font-poppins bg-custom-gradient h-screen overflow-hidden">
                <ChatWindow/>
            </div>
        </div>
    );
};

export default ChatPage;
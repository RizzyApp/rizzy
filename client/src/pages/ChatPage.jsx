import ChatMain from "../components/chat/ChatMain.jsx";
import Header from "../components/Header.jsx";

const ChatPage = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header/>
            <div className="flex flex-col flex-grow items-center justify-center font-poppins bg-custom-gradient overflow-hidden">
                <ChatMain/>
            </div>
        </div>
    );
};

export default ChatPage;
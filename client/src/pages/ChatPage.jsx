import ChatMain from "../components/chat/ChatMain.jsx";
import Header from "../components/Header.jsx";

const ChatPage = () => {
    return (
        <div className="h-screen overflow-hidden">
            <Header/>
            <div className="flex flex-col items-center font-poppins bg-custom-gradient h-screen overflow-hidden">
                <ChatMain/>
            </div>
        </div>
    );
};

export default ChatPage;
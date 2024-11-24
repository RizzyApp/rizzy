import dateConverter from "./utils/dateConverter.js";

const ChatHeader = ({selectedUser}) => {

    return (
        <div className="p-4 border-b">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full">
                    <img className="object-cover rounded-full" src={selectedUser.profilePic} alt="" />
                </div>
                <div>
                    <p className="font-medium text-gray-800">{selectedUser.name}</p>
                    <p className="text-sm text-gray-500">{dateConverter(selectedUser.lastActive)}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
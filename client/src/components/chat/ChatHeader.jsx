import dateConverter from "./utils/dateConverter.js";

const placeholderPic = "./image/blank-profile-picture.webp";

const ChatHeader = ({selectedUser}) => {


    return (
        <div className="p-4 border-b border-border-primary">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10  rounded-full">
                    <img className="object-cover rounded-full" src={selectedUser?.profilePic ?? placeholderPic} alt="" />
                </div>
                <div>
                    <p className="font-medium text-text-primary">{selectedUser.name}</p>
                    <p className="text-sm text-text-secondary">{dateConverter(selectedUser.lastActive, "last active ")}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
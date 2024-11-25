
//TODO: lazy loading for the messages and for the users themselves

const ChatSideBar = ({setSelectedUser, users}) => {

    return (
        <div className="w-1/5 bg-white rounded-l-lg shadow-md p-4">
            <input
                type="text"
                placeholder="Search for matches"
                className="w-full p-2 mb-4 text-gray-600 border rounded-lg focus:outline-none"
            />
            {users &&
                <ul>
                    {users.map((user, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-4 p-2 mb-2 transition-all bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="w-10 h-10  rounded-full">
                                <img className="object-cover rounded-full" src={user.profilePic}/>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.latestMessage?.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>}
        </div>
    );
};

export default ChatSideBar;
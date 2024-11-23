import {useState} from "react";

const ChatWindow = () => {

    const [selectedUser, setSelectedUser] = useState({
        name: "Kristóf",
        lastActive: "Online 5 minutes ago",
    });

    const users = [
        { name: "Márk", status: "Szia" },
        { name: "Kristóf", status: "Amúgy mondani ak..." },
        { name: "Peti", status: "Szia" },
        { name: "Tündi", status: "Szia" },
    ];


    return (
        <div className="flex h-[89%] w-11/12 p-6">
            {/* Sidebar */}
            <div className="w-1/3 bg-white rounded-l-lg shadow-md p-4">
                <input
                    type="text"
                    placeholder="Search for matches"
                    className="w-full p-2 mb-4 text-gray-600 border rounded-lg focus:outline-none"
                />
                <ul>
                    {users.map((user, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-4 p-2 mb-2 transition-all bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
                            onClick={() => setSelectedUser({ name: user.name, lastActive: "Online 5 minutes ago" })}
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#c471ed] to-[#f64f59] rounded-full"></div>
                            <div>
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat area */}
            <div className="flex-1 bg-white rounded-r-lg shadow-md flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="font-medium text-gray-800">{selectedUser.name}</p>
                            <p className="text-sm text-gray-500">{selectedUser.lastActive}</p>
                        </div>
                    </div>
                </div>

                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="mb-4">
                        <p className="inline-block max-w-xs p-3 text-gray-700 bg-pink-100 rounded-lg">
                            This is a short text
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="inline-block max-w-xs p-3 text-gray-700 bg-pink-100 rounded-lg">
                            So this is gonna be a long text about absolutely nothing, I just want to test this
                        </p>
                    </div>
                    <div className="flex justify-end mb-4">
                        <p className="inline-block max-w-xs p-3 text-white bg-pink-400 rounded-lg">
                            This is a response from the other side
                        </p>
                    </div>
                </div>

                {/* Input field */}
                <div className="p-4 border-t">
                    <input
                        type="text"
                        placeholder="Aa"
                        className="w-full p-3 border rounded-lg focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
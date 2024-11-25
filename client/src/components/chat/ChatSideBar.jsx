//TODO: lazy loading for the messages and for the users themselves

import {useState} from "react";
import dateConverter from "./utils/dateConverter.js";

const ChatSideBar = ({setSelectedUser, users}) => {
    // State to store the search query and the sorting preference
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('matchDate'); // default to sort by matchDate

    // Sort users by either matchDate or latestMessage.date
    const sortedUsers = [...users].sort((a, b) => {
        if (sortBy === 'matchDate') {
            return new Date(b.matchDate) - new Date(a.matchDate); // sort by matchDate (newest first)
        } else if (sortBy === 'messageDate') {
            return new Date(b.latestMessage?.timeStamp) - new Date(a.latestMessage?.timeStamp); // sort by message date (newest first)
        }
        return 0;
    });

    // Filter users based on the search query
    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-1/5 bg-white rounded-l-lg shadow-md p-4">
            <div className="flex justify-between mb-4 border-b border-gray-300 pb-2">
                <button
                    onClick={() => setSortBy('matchDate')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                        sortBy === 'matchDate'
                            ? 'bg-pink-500 text-white shadow'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                >
                    Sort by Match Date
                </button>
                <button
                    onClick={() => setSortBy('messageDate')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                        sortBy === 'messageDate'
                            ? 'bg-pink-500 text-white shadow'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                >
                    Sort by Message Date
                </button>
            </div>

            <input
                type="text"
                placeholder="Search for matches"
                className="w-full p-2 mb-4 text-gray-600 border rounded-lg focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filteredUsers.length > 0 ? (
                <ul>
                    {filteredUsers.map((user, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-4 p-2 mb-2 transition-all bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="w-10 h-10 rounded-full">
                                <img className="object-cover rounded-full" src={user.profilePic} alt={user.name}/>
                            </div>
                            <div className="h-14">
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500 max-w-36 text-ellipsis line-clamp-2">{
                                    user.latestMessage ?
                                        user.latestMessage.sideBarContent
                                            ? user.latestMessage.sideBarContent
                                            : user.latestMessage?.content
                                        : dateConverter(user.matchDate)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No matches found.</p>
            )}
        </div>
    );
};

export default ChatSideBar;
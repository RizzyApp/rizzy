import * as signalR from '@microsoft/signalr';
import {createContext, useContext, useState, useEffect} from "react";
import ENDPOINTS from "../../endpoints.js";

const defaultContextValue = {
    notificationConnection: null, chatConnection: null, notifications: [], messages: []
}


const SignalRContext = createContext(defaultContextValue);

export const SignalRProvider = ({children}) => {
    const [notificationConnection, setNotificationConnection] = useState(null);
    const [chatConnection, setChatConnection] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Create the Notification connection
        const newNotificationConnection = new signalR.HubConnectionBuilder()
            .withUrl(ENDPOINTS.LIVE.NOTIFICATIONS)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        // Handle notification event
        newNotificationConnection.on("ReceiveMatchNotification", (matchData) => {
            console.log("New Match Notification:", matchData);
            setNotifications((prevNotifications) => [...prevNotifications, matchData]);
        });

        newNotificationConnection.start()
            .then(() => console.log("Notification SignalR connected"))
            .catch(err => console.error("Error while connecting Notification SignalR", err));

        setNotificationConnection(newNotificationConnection);

        // Create the Chat connection
        const newChatConnection = new signalR.HubConnectionBuilder()
            .withUrl(ENDPOINTS.LIVE.CHAT)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        // Handle chat messages event
        newChatConnection.on("ReceiveMessage", (message) => {
            console.log("New Chat Message:", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        newChatConnection.start()
            .then(() => console.log("Chat SignalR connected"))
            .catch(err => console.error("Error while connecting Chat SignalR", err));

        setChatConnection(newChatConnection);

        return () => {
            if (newNotificationConnection) newNotificationConnection.stop();
            if (newChatConnection) newChatConnection.stop();
        };
    }, []);

    const sendMessage = () => {

    }

    return (
        <SignalRContext.Provider value={{notificationConnection, chatConnection, notifications, messages}}>
            {children}
        </SignalRContext.Provider>
    );
};

// Custom hook to access SignalR context
export const useSignalR = () => {
    return useContext(SignalRContext);
};
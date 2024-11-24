import * as signalR from '@microsoft/signalr';
import {createContext, useContext, useState, useEffect} from "react";
import {API_ENDPOINTS} from "../../constants.js";
import fetchWithCredentials from "../../utils/fetchWithCredentials.js";

const defaultContextValue = {
    notifications: [], messages: []
}

const SignalRContext = createContext(defaultContextValue);

const IMMEDIATE_RETRIES_INTERVAL = [0, 1000, 5000, 10000]
const CONNECTION_END_RETRY_LENGTH = 60000;


export const SignalRProvider = ({children}) => {
    const [notificationConnection, setNotificationConnection] = useState(null);
    const [chatConnection, setChatConnection] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);

    const setupNotificationConnection = () => {
        if (notificationConnection) return;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(API_ENDPOINTS.LIVE.NOTIFICATIONS)
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect(IMMEDIATE_RETRIES_INTERVAL)
            .build();

        connection.on("ReceiveMatchNotification", (matchData) => {
            console.log("New Match Notification:", matchData);
            setNotifications((prevNotifications) => [...prevNotifications, matchData]);
        });

        connection.start()
            .then(() => console.log("Notification SignalR connected"))
            .catch(err => {
                console.error("Error while connecting Notification SignalR", err);
                setTimeout(setupNotificationConnection, CONNECTION_END_RETRY_LENGTH);
            });

        connection.onclose(async () => {
            setNotificationConnection(null);
            console.warn("Notification SignalR connection lost. Attempting to reconnect...");
            setTimeout(setupNotificationConnection, CONNECTION_END_RETRY_LENGTH);
        });

        setNotificationConnection(connection);
    };

    const setupChatConnection = () => {
        if (chatConnection) return
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(API_ENDPOINTS.LIVE.CHAT)
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect(IMMEDIATE_RETRIES_INTERVAL)
            .build();

        connection.on("ReceiveMessage", (message) => {
            console.log("New Chat Message:", message);
            addMessage(message);
        });

        connection.start()
            .then(() => console.log("Chat SignalR connected"))
            .catch(err => {
                console.error("Error while connecting Chat SignalR", err);
                setTimeout(setupChatConnection, CONNECTION_END_RETRY_LENGTH);
            });

        connection.onclose(async () => {
            setupChatConnection(null);
            console.warn("Chat SignalR connection lost. Attempting to reconnect...");
            setTimeout(setupChatConnection, CONNECTION_END_RETRY_LENGTH);
        });

        setChatConnection(connection);
    };

    const addMessage = (newMessage) => {
        const senderId = newMessage.senderId;
        setMessages((prevMessages) => {
            const tempMessages = {...prevMessages};
            if (tempMessages[senderId]) {
                const isDuplicate = tempMessages[senderId].some((msg) => msg.id === newMessage.id);
                if (isDuplicate) {
                    console.log("Duplicate message:", newMessage);
                    return prevMessages;
                }
                tempMessages[senderId].push(newMessage);
                return tempMessages;
            } else {
                tempMessages[senderId] = [newMessage];
                return tempMessages;
            }
        })
    }

    const fetchInitialMessages = async () => {
        try {
            const result = await fetchWithCredentials(API_ENDPOINTS.MESSAGES.GET_MESSAGES_GROUPED_BY_SENDER);
            if (result.ok) {
                const data = await result.json();
                setMessages(data.data);
            } else {
                console.error("Error while fetching messages");
            }
        } catch {
            console.error("Error while fetching messages");
        }

    }

    useEffect(() => {
        fetchInitialMessages().then(() => console.log("Initial messages loaded"));
        setupNotificationConnection();
        setupChatConnection();

        return () => {
            if (notificationConnection) notificationConnection.stop();
            if (chatConnection) chatConnection.stop();
        };
    }, []);


    return (
        <SignalRContext.Provider value={{notifications, messages}}>
            {children}
        </SignalRContext.Provider>
    );
};

// Custom hook to access SignalR context
export const useSignalR = () => {
    return useContext(SignalRContext);
};
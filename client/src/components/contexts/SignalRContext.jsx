import { createContext, useContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../constants.js";
import { useAuth } from "./Authcontext.jsx";
import {
  ChatHubService,
  NotificationHubService,
} from "../../services/SignalRService.js";
import { useFetchWithAuth } from "../../hooks/useFetchWIthCredentials.js";
import useCustomToast from "../../hooks/useCustomToast.jsx";

const defaultContextValue = {
  notifications: [],
  messages: [],
};

const SignalRContext = createContext(defaultContextValue);
const CONNECTION_CHECK_INTERVAL = 60000; // 1 minute

export const SignalRProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const { isLoggedIn, userRoles } = useAuth();
  const fetchWithAuth = useFetchWithAuth();
  const { showMatchNotification } = useCustomToast();

  useEffect(() => {
    if (isLoggedIn && !userRoles.includes("Admin")) {
      const chatConnection = ChatHubService.getConnection();
      const notificationConnection = NotificationHubService.getConnection();

      ChatHubService.startConnection();
      NotificationHubService.startConnection();

      // Chat message handler
      chatConnection.on("ReceiveMessage", (message) => {
        console.log("New Chat Message:", message);
        addMessage(message);
      });

      // Notification handler
      notificationConnection.on("ReceiveMatchNotification", (notification) => {
        console.log("New Match Notification:", notification);

        if (!notifications.includes(notification.matchId)) {
          showMatchNotification(notification);
          setNotifications((prev) => [...prev, notification]);
        }
      });

      fetchInitialMessages();

      const intervalId = setInterval(() => {
        if (
          chatConnection.state !== "Connected" ||
          notificationConnection.state !== "Connected"
        ) {
          console.warn("SignalR connection lost. Reconnecting...");
          ChatHubService.startConnection();
          NotificationHubService.startConnection();
        }
      }, CONNECTION_CHECK_INTERVAL);

      return () => {
        clearInterval(intervalId);
        ChatHubService.stopConnection();
        NotificationHubService.stopConnection();
      };
    } else {
      ChatHubService.stopConnection();
      NotificationHubService.stopConnection();
    }
  }, [isLoggedIn, userRoles]);

  const addMessage = (newMessage, matchedUserId = null) => {
    const groupId = matchedUserId ? matchedUserId : newMessage.senderId;
    setMessages((prevMessages) => {
      const tempMessages = JSON.parse(JSON.stringify(prevMessages));
      if (!tempMessages[groupId]) {
        tempMessages[groupId] = [];
      }
      const isDuplicate = tempMessages[groupId].some(
        (msg) => msg.messageId === newMessage.messageId
      );
      if (!isDuplicate) {
        tempMessages[groupId].push(newMessage);
      }
      return tempMessages;
    });
  };

  const fetchInitialMessages = async () => {
    try {
      const result = await fetchWithAuth(
        API_ENDPOINTS.MESSAGES.GET_MESSAGES_GROUPED_BY_SENDER
      );
      if (result.ok) {
        const data = await result.json();
        setMessages(data.data);
      } else {
        console.error("Error fetching initial messages");
      }
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }
  };

  return (
    <SignalRContext.Provider value={{ notifications, messages, addMessage }}>
      {children}
    </SignalRContext.Provider>
  );
};

// Custom hook to access SignalR context
export const useSignalR = () => {
  return useContext(SignalRContext);
};

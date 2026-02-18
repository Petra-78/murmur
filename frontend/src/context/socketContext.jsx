import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    if (socket) return;

    const s = io("https://murmur-production.up.railway.app", {
      withCredentials: true,
      auth: { token },
    });

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
      setConnected(true);
    });

    s.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [token]);

  const joinChat = (chatId) => {
    socket?.emit("joinChat", chatId);
  };

  const sendTyping = (chatId, user) => {
    socket?.emit("typing", { chatId, user });
  };

  const stopTyping = (chatId) => {
    socket?.emit("stopTyping", { chatId });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        joinChat,
        sendTyping,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used inside SocketProvider");
  }
  return context;
};

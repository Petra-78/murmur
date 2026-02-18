import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (socket) return;

    const s = io("https://murmur-production.up.railway.app", {
      withCredentials: true,
      auth: { token: localStorage.getItem("jwt") },
    });

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
    });

    s.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const joinChat = (chatId) => {
    socket.current?.emit("joinChat", chatId);
  };

  const sendTyping = (chatId, user) => {
    socket.current?.emit("typing", { chatId, user });
  };

  const stopTyping = (chatId) => {
    socket.current?.emit("stopTyping", { chatId });
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

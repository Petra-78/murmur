import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;

    const socket = io("https://murmur-production.up.railway.app", {
      withCredentials: true,
      auth: {
        token: localStorage.getItem("jwt"),
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const joinChat = (chatId) => {
    socketRef.current?.emit("joinChat", chatId);
  };

  const sendTyping = (chatId, user) => {
    socketRef.current?.emit("typing", { chatId, user });
  };

  const stopTyping = (chatId) => {
    socketRef.current?.emit("stopTyping", { chatId });
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
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

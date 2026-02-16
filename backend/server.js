import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("joinChat", (chatId) => {
      socket.join(`chat-${chatId}`);
    });

    socket.on("typing", ({ chatId, user }) => {
      socket.to(`chat-${chatId}`).emit("userTyping", user);
    });

    socket.on("stopTyping", ({ chatId }) => {
      socket.to(`chat-${chatId}`).emit("userStoppedTyping");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};

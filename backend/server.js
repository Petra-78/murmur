import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://murmur-app.netlify.app",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id, "User:", socket.user.id);

    socket.on("joinChat", (chatId) => {
      socket.join(`chat-${chatId}`);
    });

    socket.on("typing", ({ chatId }) => {
      socket.to(`chat-${chatId}`).emit("userTyping", {
        userId: socket.user.id,
        username: socket.user.username,
      });
    });

    socket.on("stopTyping", ({ chatId }) => {
      socket.to(`chat-${chatId}`).emit("userStoppedTyping", {
        userId: socket.user.id,
      });
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

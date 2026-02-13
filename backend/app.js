import express from "express";
import passport from "./config/jwtStrategy.js";
import "dotenv/config";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import { createServer } from "node:http";

import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { followRouter } from "./routes/followRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { chatRouter } from "./routes/chatRouter.js";

export const app = express();

app.use(express.json());
app.use(passport.initialize());

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "test.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/", authRouter);

app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);

app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  followRouter,
);
app.use("/posts", passport.authenticate("jwt", { session: false }), postRouter);

app.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRouter,
);
app.use("/chats", passport.authenticate("jwt", { session: false }), chatRouter);

server.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`app listening on port ${process.env.PORT}!`);
});

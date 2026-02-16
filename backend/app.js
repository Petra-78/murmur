import express from "express";
import passport from "./config/jwtStrategy.js";
import cors from "cors";
import "dotenv/config";

import { createServer } from "node:http";
import { initSocket } from "./server.js";

import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { followRouter } from "./routes/followRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { chatRouter } from "./routes/chatRouter.js";

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(passport.initialize());

const server = createServer(app);
initSocket(server);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
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

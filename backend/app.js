import express from "express";
import passport from "./config/jwtStrategy.js";

import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { followerRouter } from "./routes/followRouter.js";
import { postRouter } from "./routes/postRouter.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/", authRouter);

app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/users", followerRouter);
app.use("/posts", passport.authenticate("jwt", { session: false }), postRouter);

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`app listening on port ${process.env.PORT}!`);
});

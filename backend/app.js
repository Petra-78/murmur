import express from "express";
import passport from "./config/jwtStrategy.js"

import { authRouter } from "./routes/authRouter.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/", passport.authenticate("jwt", { session: false }), (req,res)=>{
    res.json({message:"hi!"})
})

app.use("/", authRouter)

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`app listening on port ${process.env.PORT}!`);
});

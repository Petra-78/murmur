import passport from "passport";
import LocalStrategy from "passport-local"
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique(
        {where:{
            email
        }}
      );
    

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);


export default passport;
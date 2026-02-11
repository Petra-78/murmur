
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../lib/prisma.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.JWT_SECRET, 
};

passport.use(
  new JwtStrategy(options, async (token, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: token.userId },
      });
      if (!user) return done(null, false);
      return done(null, user); 
    } catch (err) {
      done(err, false);
    }
  })
);

export default passport;

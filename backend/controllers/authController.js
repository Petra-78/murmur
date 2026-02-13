import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import crypto from "crypto";

export async function postLogin(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        profileUrl: user.profileUrl,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2days" },
    );

    return res.json({
      token,
      user: { username: user.username, profileUrl: user.profileUrl },
    });
  })(req, res, next);
}

export async function postGuestLogin(req, res, next) {
  debugger;
  const randomPwd = crypto.randomBytes(32).toString("hex");
  const password = await bcrypt.hash(randomPwd, 10);
  const guestUser = await prisma.user.create({
    data: {
      username: `guest_${Date.now()}`,
      email: `guest_${Date.now()}@guest.murmur`,
      password,
      isGuest: true,
    },
  });

  const token = jwt.sign(
    {
      userId: guestUser.id,
      username: guestUser.username,
      profileUrl: guestUser.profileUrl,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2days" },
  );

  return res.json({
    token,
    user: { username: guestUser.username, profileUrl: guestUser.profileUrl },
  });
}

export async function postSignup(req, res) {
  debugger;
  try {
    const { email, username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already in use" });
      }
      return res.status(400).json({ message: "Username is taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        profileUrl: user.profileUrl,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2days" },
    );

    const { password: _, ...safeUser } = user;

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

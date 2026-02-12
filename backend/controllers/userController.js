import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

export async function getUsers(req, res) {
  const { id } = req.user;

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id,
        },
      },
      select: {
        id: true,
        username: true,
        profileUrl: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
}

export async function getProfile(req, res) {
  const { userId } = req.user;

  try {
    const user = await prisma.user.findMany({
      where: {
        id: userId,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(req, res) {
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        username: true,
        profileUrl: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(req, res) {
  const { username, email } = req.body;
  const { userId } = req.user;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already taken" });
    }
    console.log(err);
  }
}

export async function uploadProfilePicture(req, res) {
  try {
    const { userId } = req.user;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64",
    )}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "avatars",
      public_id: `user_${userId}`,
      overwrite: true,
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatarUrl: uploadResult.secure_url,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile upload failed" });
  }
}

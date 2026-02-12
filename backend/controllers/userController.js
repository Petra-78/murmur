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
  debugger;
  const { id } = req.user;

  try {
    const user = await prisma.user.findMany({
      where: {
        id,
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

export async function getRecentUsers(req, res) {
  const { id } = req.user;

  try {
    const recentUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id,
        },
      },
      orderBy: { createdAt: "desc" },
      select: {
        username: true,
        profileUrl: true,
      },
      take: 5,
    });
    res.json(recentUsers);
  } catch (err) {
    console.log(err);
  }
}

export async function getPopularUsers(req, res) {
  const { id } = req.user;

  try {
    const popularUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id,
        },
      },
      orderBy: {
        followers: {
          _count: "desc",
        },
      },
      select: {
        username: true,
        profileUrl: true,
      },
      take: 5,
    });
    res.json(popularUsers);
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(req, res) {
  debugger;
  const { username, email } = req.body;
  const { id } = req.user;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
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
    const { id } = req.user;

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
      where: { id },
      data: {
        profileUrl: uploadResult.secure_url,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileUrl: true,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile upload failed" });
  }
}

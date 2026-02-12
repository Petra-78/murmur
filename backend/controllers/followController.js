import { prisma } from "../lib/prisma.js";

export async function getFollowers(req, res) {
  const { username } = req.params;

  try {
    const followers = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        followers: {
          select: {
            follower: {
              select: { id: true, username: true, profileUrl: true },
            },
          },
        },
      },
    });
    res.json(followers);
  } catch (err) {
    console.log(err);
  }
}

export async function getFollowing(req, res) {
  debugger;
  const { username } = req.params;

  try {
    const following = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        following: {
          select: {
            following: {
              select: { id: true, username: true, profileUrl: true },
            },
          },
        },
      },
    });
    res.json({ following });
  } catch (err) {
    console.log(err);
  }
}

export async function followUser(req, res) {
  debugger;
  const { id } = req.user;
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const followedUser = await prisma.follow.create({
      data: {
        followerId: id,
        followingId: user.id,
      },
    });
    res.json(followedUser);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "User is already followed." });
    }
    console.log(err);
  }
}

export async function unfollowUser(req, res) {
  debugger;
  const { id } = req.user;
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const unfollowedUser = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: id,
          followingId: user.id,
        },
      },
    });
    res.json({ unfollowedUser: user });
  } catch (err) {
    console.log(err);
  }
}

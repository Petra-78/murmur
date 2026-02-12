import { prisma } from "../lib/prisma.js";

export async function getFollowers(req, res) {
  const { username } = req.params;

  try {
    const followers = await prisma.user.findUnique({
      where: {
        username,
      },
      select: { followers: true },
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
    const followers = await prisma.user.findUnique({
      where: {
        username,
      },
      select: { following: true },
    });
    res.json(followers);
  } catch (err) {
    console.log(err);
  }
}

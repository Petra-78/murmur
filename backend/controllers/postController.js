import { prisma } from "../lib/prisma.js";

export async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
}

export async function getPost(req, res) {
  debugger;
  const postId = Number(req.params.postId);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.json({ message: "No post found." });
    }
    res.json(post);
  } catch (err) {
    console.log(err);
  }
}

export async function getUsersPosts(req, res) {
  debugger;
  const { username } = req.params;

  try {
    const userPosts = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        posts: true,
      },
    });
    if (userPosts.posts.length === 0) {
      return res.json({ message: "This user hasn't posted yet." });
    }
    res.json(userPosts);
  } catch (err) {
    console.log(err);
  }
}

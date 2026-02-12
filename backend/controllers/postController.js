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

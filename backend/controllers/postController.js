import { prisma } from "../lib/prisma.js";

export async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
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
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
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
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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

export async function getPostsOfFollowing(req, res) {
  debugger;
  const { id } = req.user;

  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: id,
      },
      select: {
        followingId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const followingIds = following.map((f) => f.followingId);

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingIds,
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
}

export async function likePost(req, res) {
  const { id } = req.user;
  const postId = Number(req.params.postId);

  try {
    const isLiked = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: id,
        },
      },
    });

    if (isLiked) {
      const dislikePost = await prisma.postLike.delete({
        where: {
          postId_userId: {
            postId,
            userId: id,
          },
        },
      });
      return res.json({ dislikedPost: dislikePost });
    } else {
      const likePost = await prisma.postLike.create({
        data: {
          postId,
          userId: id,
        },
      });
      return res.json({ likedPost: likePost });
    }
  } catch (err) {
    console.log(err);
  }
}

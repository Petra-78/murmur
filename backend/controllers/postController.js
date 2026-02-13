import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

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
        author: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
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
        author: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
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
  const { username } = req.params;

  try {
    const userPosts = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        profileUrl: true,
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
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
        author: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
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

export async function getLikedPosts(req, res) {
  const { id } = req.user;

  try {
    const likes = await prisma.postLike.findMany({
      where: {
        userId: id,
      },
      select: {
        postId: true,
      },
    });

    const postsIds = likes.map((l) => l.postId);

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: postsIds,
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
}

export async function deletePost(req, res) {
  const postId = Number(req.params.postId);
  const id = req.user;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this post" });
    }

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    res.json({ deletedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
}

export async function uploadPost(req, res) {
  debugger;
  const { id } = req.user;
  const { content } = req.body;

  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: `murmur/posts/user_${req.user.username}/post_images` },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        );
        stream.end(req.file.buffer);
      });
    }

    const post = await prisma.post.create({
      data: {
        content: content || "",
        authorId: id,
        imageUrl,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
          },
        },
      },
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload post" });
  }
}

export async function updatePost(req, res) {
  const { id } = req.user;
  const postId = Number(req.params.postId);
  const content = req.body.content;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (existingPost.authorId !== id) {
      return res
        .status(403)
        .json({ error: "Not authorized to edit this post" });
    }

    let imageUrl = existingPost.imageUrl;

    if (req.file) {
      if (imageUrl) {
        const publicId = existingPost.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(
          `murmur/posts/user_${req.user.username}/post_images/${publicId}`,
        );
      }

      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: `murmur/posts/user_${req.user.username}/post_images` },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        );
        stream.end(req.file.buffer);
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        content: content !== undefined ? content : existingPost.content,
        imageUrl,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
          },
        },
      },
    });

    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
}

import { prisma } from "../lib/prisma.js";

export async function getComments(req, res) {
  debugger;
  const postId = Number(req.params.postId);

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
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

    const commentMap = {};
    comments.forEach((c) => {
      if (c.parentId === null) {
        commentMap[c.id] = { ...c, replies: [] };
      } else {
        commentMap[c.id] = { ...c };
      }
    });

    const topLevelComments = [];

    comments.forEach((c) => {
      if (c.parentId === null) {
        topLevelComments.push(commentMap[c.id]);
      } else {
        let parent = commentMap[c.parentId];
        while (parent.parentId !== null) {
          parent = commentMap[parent.parentId];
        }
        parent.replies.push(commentMap[c.id]);
      }
    });

    res.json(topLevelComments);
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to load comments" });
  }
}

export async function postComment(req, res) {
  const { id } = req.user;
  const { content } = req.body;
  const postId = Number(req.params.postId);

  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: id,
        postId,
        content,
      },
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to post comment" });
  }
}

export async function replyToComment(req, res) {
  const { id } = req.user;
  const { content } = req.body;
  const postId = Number(req.params.postId);
  const parentId = Number(req.params.parentId);

  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: id,
        postId,
        parentId,
        content,
      },
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to post comment" });
  }
}

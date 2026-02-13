import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

export async function getChats(req, res) {
  const { id } = req.user;

  try {
    const chats = await prisma.userChat.findMany({
      where: {
        userId: id,
      },
      select: {
        chat: {
          select: {
            id: true,
            createdAt: true,
            messages: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
              select: {
                id: true,
                content: true,
                imageUrl: true,
                createdAt: true,
                userId: true,
              },
            },
            userChats: {
              where: {
                NOT: {
                  userId: id,
                },
              },
              select: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    profileUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedChats = chats
      .map((c) => ({
        chatId: c.chat.id,
        otherUser: c.chat.userChats[0]?.user || null,
        lastMessage: c.chat.messages[0] || null,
      }))
      .sort((a, b) => {
        const aTime = a.lastMessage?.createdAt?.getTime() || 0;
        const bTime = b.lastMessage?.createdAt?.getTime() || 0;
        return bTime - aTime;
      });

    res.json(formattedChats);
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong while fetching chats" });
  }
}

async function findOrCreateChat(userId, selectedUserId) {
  let chat = await prisma.chat.findFirst({
    where: {
      AND: [
        { userChats: { some: { userId } } },
        { userChats: { some: { userId: selectedUserId } } },
      ],
    },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        userChats: {
          create: [{ userId }, { userId: selectedUserId }],
        },
      },
    });
  }

  return chat;
}

export async function sendMessage(req, res) {
  const { id } = req.user;
  const { selectedUser, content } = req.body;
  try {
    const chat = await findOrCreateChat(id, Number(selectedUser));

    let imageUrl = null;
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `murmur/users/${req.user.username}/chats/chat_${selectedUser}_images`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        );
        stream.end(req.file.buffer);
      });
    }

    const message = await prisma.message.create({
      data: {
        content: content || "",
        userId: id,
        chatId: chat.id,
        imageUrl,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
          },
        },
      },
    });

    return res.json(message);
  } catch (err) {
    console.error(err);
    return res.json({ message: "Something went wrong" });
  }
}

export async function getMessages(req, res) {
  debugger;
  const { id } = req.user;
  const selectedUserId = Number(req.params.selectedUserId);

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { userChats: { some: { userId: id } } },
          { userChats: { some: { userId: selectedUserId } } },
        ],
      },
    });

    if (!chat) {
      return res.json([]);
    }

    const messages = await prisma.message.findMany({
      where: {
        chatId: chat.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profileUrl: true,
          },
        },
      },
    });

    res.json(messages);
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to fetch messages" });
  }
}

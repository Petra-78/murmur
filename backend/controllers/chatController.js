import { prisma } from "../lib/prisma.js";

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
            orderBy: {
              messages: {
                _max: { createdAt: "desc" },
              },
            },
          },
        },
      },
    });

    const formattedChats = chats.map((c) => ({
      chatId: c.chat?.id,
      otherUser: c.chat?.userChats?.[0]?.user || null,
      lastMessage: c.chat?.messages?.[0] || null,
    }));

    res.json(formattedChats);
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong while fetching chats" });
  }
}

export async function createChat(req, res) {
  try {
    const { id } = req.user;
    const { selectedUser } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id: Number(selectedUser) },
      select: { id: true },
    });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const isExisting = await prisma.chat.findFirst({
      where: {
        AND: [
          { userChats: { some: { userId: id } } },
          { userChats: { some: { userId: Number(selectedUser) } } },
        ],
      },
    });

    if (isExisting) {
      return res.json({ message: "Chat already exists", chat: isExisting });
    }

    const chat = await prisma.chat.create({
      data: {
        userChats: {
          create: [{ userId: id }, { userId: Number(selectedUser) }],
        },
      },
    });

    res.json(chat);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Something went wrong" });
  }
}

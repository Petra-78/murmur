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
          },
        },
      },
    });

    const formattedChats = chats.map((c) => ({
      chatId: c.chat.id,
      otherUser: c.chat.userChats[0]?.user,
      lastMessage: c.chat.messages[0] || null,
    }));

    res.json(formattedChats);
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong while fetching chats" });
  }
}

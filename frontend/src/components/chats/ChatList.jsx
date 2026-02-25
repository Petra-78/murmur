import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const { token, user } = useAuth();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(
          "https://murmur-production.up.railway.app/chats",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await res.json();
        debugger;
        setChats(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [token]);

  const openChat = (otherUserId) => {
    navigate(`/chats/${otherUserId}`);
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading chats...
      </div>
    );

  return (
    <div className="mx-auto max-h-[75vh] w-full space-y-3 overflow-y-auto lg:h-[75vh]">
      {chats && chats.length === 0 && (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          No chats yet.
        </div>
      )}

      {chats &&
        chats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => openChat(chat.otherUser?.id)}
            className="flex cursor-pointer items-center gap-4 rounded-xl bg-white p-3 shadow-sm transition-all duration-200 hover:bg-gray-100 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          >
            <img
              src={chat.otherUser?.profileUrl || "/placeholder.jpeg"}
              alt="pfp"
              className="h-12 w-12 rounded-full border border-gray-200 object-cover dark:border-zinc-700"
            />

            <div className="flex min-w-0 flex-col">
              <div className="text-left font-semibold text-gray-900 dark:text-white">
                {chat.otherUser?.username || "Unknown"}
              </div>

              <div className="max-w-35 truncate text-left text-sm text-gray-500 dark:text-gray-400">
                {(() => {
                  const last = chat.lastMessage;

                  if (!last) return "No messages yet";

                  if (last.content) return last.content;

                  if (last.imageUrl) {
                    return last.userId === user.id
                      ? "You sent an image"
                      : `${chat.otherUser?.username || "Unknown"} sent an image`;
                  }

                  return "No messages yet";
                })()}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  debugger;
  const { token } = useAuth();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

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
        setChats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [token]);

  const openChat = (otherUserId) => {
    navigate(`/chats/${otherUserId}`);
  };

  return (
    <div>
      {chats && chats.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No chats yet.
        </div>
      )}
      {chats &&
        chats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => openChat(chat.otherUser?.id)}
            style={{
              cursor: "pointer",
              display: "flex",
              gap: "10px",
              margin: "10px 0",
            }}
          >
            <img
              src={chat.otherUser?.profileUrl || "/placeholder.jpeg"}
              alt="pfp"
              width={50}
              height={50}
            />
            <div>
              <div>{chat.otherUser?.username || "Unknown"}</div>
              <div style={{ color: "gray" }}>
                {chat.lastMessage?.content || "No messages yet"}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

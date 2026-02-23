import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useSocket } from "../../context/socketContext";
import { toast } from "react-toastify";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import ImagePreview from "./ImagePreview";
import TypingDots from "../buttons/TypingDots";

export default function ChatWindow() {
  const { selectedUserId } = useParams();
  const { token, user } = useAuth();
  const { socket, joinChat } = useSocket();

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [sending, setSending] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const typingTimeout = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `https://murmur-production.up.railway.app/chats/messages/${selectedUserId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const data = await res.json();

        if (!res.ok || data.error) {
          toast.error(data.error || "Failed to load messages");
          return;
        }

        setMessages(data);
        setLoading(false);

        if (data.length > 0) {
          joinChat(data[0].chatId);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (selectedUserId && token) {
      fetchMessages();
    }
  }, [selectedUserId, token, joinChat]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    const handleTyping = ({ userId }) => {
      if (userId === user.id) return;
      setTypingUsers((prev) => ({ ...prev, [userId]: true }));
    };

    const handleStopTyping = ({ userId }) => {
      setTypingUsers((prev) => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("userTyping", handleTyping);
    socket.on("userStoppedTyping", handleStopTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("userTyping", handleTyping);
      socket.off("userStoppedTyping", handleStopTyping);
    };
  }, [socket, user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();

    if ((!content && !imageFile) || !selectedUserId) return;

    setSending(true);

    try {
      const formData = new FormData();
      formData.append("selectedUser", selectedUserId);
      if (content) formData.append("content", content);
      if (imageFile) formData.append("file", imageFile);

      const res = await fetch(
        `https://murmur-production.up.railway.app/chats/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error(data.error || "Failed to send message");
        setSending(false);
        return;
      }

      if (messages.length === 0 && data.chatId) {
        joinChat(data.chatId);
      }

      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setSending(false);

      socket?.emit("stopTyping", { chatId: data.chatId });
    } catch (err) {
      console.error(err);
      setSending(false);
    }
  }

  const handleTyping = () => {
    if (!socket || !messages[0]?.chatId) return;

    socket.emit("typing", { chatId: messages[0].chatId });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", { chatId: messages[0].chatId });
    }, 1000);
  };

  return (
    <div className="flex h-8/10 min-h-0 flex-col rounded-lg bg-gray-50 p-2 shadow-md sm:p-4 lg:h-full dark:bg-zinc-950">
      <MessageList
        messages={messages}
        currentUser={user}
        loading={loading}
        endRef={messagesEndRef}
        className="flex-1 overflow-y-auto"
      />

      {Object.keys(typingUsers).length > 0 && <TypingDots />}

      {imagePreview && (
        <ImagePreview
          src={imagePreview}
          onRemove={() => {
            setImageFile(null);
            setImagePreview(null);
          }}
        />
      )}

      <MessageInput
        content={content}
        setContent={setContent}
        onSubmit={sendMessage}
        onImageSelect={(file) => {
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file));
        }}
        sending={sending}
        handleTyping={handleTyping}
        className="flex shrink-0 items-center gap-2 border-t bg-white p-2 sm:p-3"
      />
    </div>
  );
}

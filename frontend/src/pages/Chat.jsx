import LeftSidebar from "../components/left-sidebar/LeftSidebar";
import RightSidebar from "../components/right-sidebar/RightSidebar";
import ChatWindow from "../components/chats/ChatWindow";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Chat() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { selectedUserId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token) return;

    async function fetchProfile() {
      const res = await fetch(
        `https://murmur-production.up.railway.app/users/id/${selectedUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok)
        toast.error(
          "Failed to load user data. Please try again later.",
        );

      const data = await res.json();
      setUserData(data.user);
    }

    fetchProfile();
  }, [selectedUserId, token]);
  return (
    <div className="flex w-full flex-1 justify-center overflow-hidden bg-gray-100 dark:bg-zinc-900">
      <div className="max-w-8xl mx-auto grid flex-1 grid-cols-1 justify-center gap-6 lg:grid-cols-[minmax(170px,300px)_minmax(400px,850px)_350px] lg:px-4 lg:py-2">
        <aside className="hidden lg:block">
          <div className="rounded-xl bg-white p-4 shadow-sm md:top-23 dark:bg-zinc-950 dark:text-white">
            <LeftSidebar />
          </div>
        </aside>

        <aside className="fixed right-0 bottom-0 left-0 z-50 bg-white p-3 shadow lg:hidden dark:bg-zinc-950">
          <LeftSidebar />
        </aside>
        <div className="flex h-[calc(100vh-137px)] min-h-0 flex-col">
          <div className="flex w-full gap-4 border-b border-[#A13333] bg-white/90 p-3 dark:bg-[#040303]/90">
            <button
              className="flex items-center gap-3 text-zinc-900 transition-colors duration-200 hover:text-[#A13333] dark:text-gray-300"
              onClick={() => navigate("/chats")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flex justify-center gap-3">
              <img
                src={userData?.profileUrl || "/placeholder.jpeg"}
                alt="profile picture"
                className="h-10 w-10 rounded-full object-cover"
              />
              <p className="self-center dark:text-white">
                {userData?.username || "Unknown User"}
              </p>
            </div>
          </div>

          <ChatWindow />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-0 rounded-2xl bg-white p-2 shadow-sm dark:bg-zinc-950">
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}

import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import PostCard from "../components/posts/PostCard";
import { useState } from "react";

export default function Home() {
  const { user, authLoading } = useAuth();
  const [feed, setFeed] = useState("posts");

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="h-dvh w-dvw flex flex-col bg-gray-100 dark:bg-zinc-900 overflow-hidden p-1 items-center">
      <div className="flex justify-center gap-8 py-6">
        <button
          onClick={() => setFeed("posts")}
          className={` px-2
      relative pb-2 text-md transition-colors duration-300
      ${
        feed === "posts"
          ? "font-bold dark:text-white text-zinc-900 "
          : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      }
    `}
        >
          Posts
          {feed === "posts" && (
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#A13333] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setFeed("following")}
          className={`
      relative pb-2 text-md  transition-colors duration-300 px-2
      ${
        feed === "following"
          ? "font-bold dark:text-white text-zinc-900"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      }
    `}
        >
          Following
          {feed === "following" && (
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#A13333] rounded-full" />
          )}
        </button>
      </div>

      <PostCard feed={feed} />
    </div>
  );
}

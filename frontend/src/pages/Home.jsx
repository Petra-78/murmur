import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import PostCards from "../components/posts/PostCards";
import { useState } from "react";

export default function Home() {
  const { user, authLoading } = useAuth();
  const [feed, setFeed] = useState("posts");

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-dvh w-dvw flex-col items-center overflow-hidden bg-gray-100 p-1 dark:bg-zinc-900">
      <div className="flex justify-center gap-8 py-6">
        <button
          onClick={() => setFeed("posts")}
          className={`text-md relative px-2 pb-2 transition-colors duration-300 ${
            feed === "posts"
              ? "font-bold text-zinc-900 dark:text-white"
              : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          } `}
        >
          Posts
          {feed === "posts" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#A13333]" />
          )}
        </button>

        <button
          onClick={() => setFeed("following")}
          className={`text-md relative px-2 pb-2 transition-colors duration-300 ${
            feed === "following"
              ? "font-bold text-zinc-900 dark:text-white"
              : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          } `}
        >
          Following
          {feed === "following" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#A13333]" />
          )}
        </button>
      </div>

      <PostCards feed={feed} />
    </div>
  );
}

import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import PostCards from "../components/posts/PostCards";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import RightSidebar from "../components/right-sidebar/RightSidebar";
import LeftSidebar from "../components/left-sidebar/LeftSidebar";

export default function Home() {
  const { user, token, authLoading } = useAuth();
  const [feed, setFeed] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainLoading, setMainLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function fetchPosts() {
      setLoading(true);
      let url =
        feed === "following"
          ? "https://murmur-production.up.railway.app/posts/following"
          : "https://murmur-production.up.railway.app/posts";

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setMainLoading(false);
      }
    }

    fetchPosts();
  }, [feed, token]);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (mainLoading) return <Loading />;

  return (
    <div className="w-full flex-1 bg-gray-100 dark:bg-zinc-900">
      <div className="max-w-8xl grid w-full grid-cols-1 justify-center gap-2 px-4 py-2 lg:mx-auto lg:grid-cols-[minmax(170px,300px)_minmax(400px,850px)_350px]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 w-full rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-950 dark:text-white">
            <LeftSidebar />
          </div>
        </aside>

        <aside className="fixed right-0 bottom-0 left-0 z-50 bg-white p-4 shadow lg:hidden dark:bg-zinc-950">
          <LeftSidebar />
        </aside>

        <main className="flex w-full max-w-3xl flex-col items-center justify-self-center">
          <div className="sticky mb-4 flex w-full max-w-3xl justify-center gap-8 rounded-xl bg-white py-4 shadow-sm lg:top-1.5 lg:z-50 dark:bg-zinc-950">
            <button
              onClick={() => setFeed("posts")}
              className={`relative px-3 pb-2 text-sm font-medium transition-colors duration-200 ${
                feed === "posts"
                  ? "text-zinc-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Posts
              {feed === "posts" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#A13333]" />
              )}
            </button>

            <button
              onClick={() => setFeed("following")}
              className={`relative px-3 pb-2 text-sm font-medium transition-colors duration-200 ${
                feed === "following"
                  ? "text-zinc-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Following
              {feed === "following" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#A13333]" />
              )}
            </button>
          </div>

          <div className="flex w-full flex-col gap-4">
            <PostCards posts={posts} loading={loading} />
          </div>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl bg-white p-2 shadow-sm dark:bg-zinc-950">
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}

import { useAuth } from "../context/authContext";
import { Navigate, useParams } from "react-router-dom";
import PostCards from "../components/posts/PostCards";
import { useState, useEffect } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, token, authLoading } = useAuth();
  const { username } = useParams();

  const [feed, setFeed] = useState("username");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  const [postsLoading, setPostsLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const loading = postsLoading && profileLoading;

  useEffect(() => {
    if (!token) return;

    async function fetchPosts() {
      setPostsLoading(true);
      console.log("Fetching posts...");
      console.log(`username: ${username}`);
      let url =
        feed === "liked"
          ? "https://murmur-production.up.railway.app/posts/liked"
          : `https://murmur-production.up.railway.app/posts/user/${username}`;

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok)
          throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setPostsLoading(false);
      }
    }

    fetchPosts();
  }, [feed, token, username]);

  useEffect(() => {
    if (!token) return;

    async function fetchProfile() {
      setProfileLoading(true);

      try {
        const res = await fetch(
          `https://murmur-production.up.railway.app/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok)
          throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUserData(data.user);
        console.log(data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setProfileLoading(false);
      }
    }

    fetchProfile();
  }, [username, token]);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <Loading />;

  return (
    <div className="flex h-dvh w-dvw flex-col items-center overflow-hidden bg-gray-100 p-1 dark:bg-zinc-900">
      <ProfileInfo userData={userData} />
      <div className="flex justify-center gap-8 py-6">
        <button
          onClick={() => setFeed("username")}
          className={`text-md relative px-2 pb-2 transition-colors duration-300 ${
            feed === "username"
              ? "font-bold text-zinc-900 dark:text-white"
              : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          } `}
        >
          Posts
          {feed === "username" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#A13333]" />
          )}
        </button>
        {user.id === userData.id && (
          <button
            onClick={() => setFeed("liked")}
            className={`text-md relative px-2 pb-2 transition-colors duration-300 ${
              feed === "liked"
                ? "font-bold text-zinc-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            } `}
          >
            Liked
            {feed === "liked" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#A13333]" />
            )}
          </button>
        )}
      </div>
      <PostCards posts={posts} loading={postsLoading} />
    </div>
  );
}

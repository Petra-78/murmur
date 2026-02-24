import { useAuth } from "../context/authContext";
import { Navigate, useParams } from "react-router-dom";
import PostCards from "../components/posts/PostCards";
import { useState, useEffect } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import Loading from "../components/Loading";
import LeftSidebar from "../components/left-sidebar/LeftSidebar";
import RightSidebar from "../components/right-sidebar/RightSidebar";

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
        if (data.message) {
          setPosts([]);
          return;
        }
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
        <div className="flex min-h-dvh max-w-dvw flex-col items-center bg-gray-100 p-1 dark:bg-zinc-900">
          <ProfileInfo
            userData={userData}
            setUserData={setUserData}
            setPosts={setPosts}
          />
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
            {user &&
              userData &&
              user.username === userData.username && (
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
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl bg-white p-2 shadow-sm dark:bg-zinc-950">
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}

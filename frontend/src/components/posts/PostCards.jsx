import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { formatDate } from "../../utils/dateFormatter";
import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import Loading from "../Loading";
import { Link } from "react-router";

export default function PostCards({ feed }) {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      let url;
      if (feed === "posts")
        url = "https://murmur-production.up.railway.app/posts";
      if (feed === "following")
        url =
          "https://murmur-production.up.railway.app/posts/following";
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          console.error("Failed to fetch posts");
          return;
        }
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, [feed]);

  if (loading) return <Loading />;

  if (posts.length === 0)
    return <p className="dark:text-white">No posts yet.</p>;

  return (
    <>
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} className="w-full max-w-2xl">
          <div
            key={post.id}
            className="relative flex cursor-pointer flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-lg shadow-red-800/20 transition-all duration-300 hover:shadow-2xl dark:bg-[#040303]/90"
          >
            <div className="flex items-center gap-2">
              <img
                className="h-10 w-10 rounded-full border border-[#e5d6d3] dark:border-[#A13333]/50"
                src={post.author.profileUrl || "/placeholder.jpeg"}
                alt="profile picture"
              />
              <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-semibold">
                  {post.author.username}
                </p>
                <span>·</span>
                <span className="text-xs">
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {post.content && (
                <p className="px-2 text-left text-lg text-gray-800 dark:text-gray-100">
                  {post.content}
                </p>
              )}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="post image"
                  className="max-h-96 w-full rounded-xl object-cover"
                />
              )}
            </div>

            <div className="mt-2 flex items-center gap-3">
              <LikeButton
                type="post"
                id={post.id}
                likes={post._count.likes}
                isLiked={post.likes.length > 0 ? true : false}
              />
              <CommentButton comments={post._count.comments} />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

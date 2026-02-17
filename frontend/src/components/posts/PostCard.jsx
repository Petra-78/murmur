import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { formatDate } from "../../utils/dateFormatter";
import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";

export default function PostCard() {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      debugger;
      try {
        const res = await fetch(
          "https://murmur-production.up.railway.app/posts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
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
  }, []);

  if (loading) return <p>Loading posts...</p>;

  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="
        relative flex flex-col gap-3 p-4 rounded-2xl shadow-md max-w-2xl
        transition-colors duration-500
        bg-white/90 border border-[#e5d6d3]
        dark:bg-[#040303]/90 dark:border-[#A13333]/30
        "
        >
          <div className="flex items-center gap-2">
            <img
              className="rounded-full h-12 w-12 border border-[#e5d6d3] dark:border-[#A13333]/50"
              src={post.author.profileUrl || "/placeholder.jpeg"}
              alt="profile picture"
            />
            <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold">{post.author.username}</p>
              <span>·</span>
              <span className="text-xs">{formatDate(post.createdAt)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {post.content && (
              <p className="text-gray-800 dark:text-gray-100 text-lg text-left px-2">
                {post.content}
              </p>
            )}
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="post image"
                className="rounded-xl max-h-96 w-full object-cover"
              />
            )}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <LikeButton
              type="post"
              id={post.id}
              likes={post._count.likes}
              isLiked={post.likes.length > 0 ? true : false}
            />
            <CommentButton comments={post._count.comments} />
          </div>
        </div>
      ))}
    </>
  );
}

import { useEffect, useState } from "react";
import Loading from "../Loading";
import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import { useParams } from "react-router";
import { useAuth } from "../../context/authContext";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function PostCard() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!token) return;
    async function fetchPost() {
      setLoading(true);
      const res = await fetch(
        `https://murmur-production.up.railway.app/posts/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.message || "Failed to fetch post");
      }
      setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [token, postId]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="w-full border-b border-[#A13333] bg-white/90 p-3 dark:bg-[#040303]/90">
        <button
          className="flex items-center gap-3 text-zinc-900 transition-colors duration-200 hover:text-[#A13333] dark:text-gray-300"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to posts
        </button>
      </div>
      <div
        key={post.id}
        className="relative flex w-full flex-col gap-3 bg-white/90 p-4 shadow-lg shadow-red-800/20 transition-all duration-300 hover:shadow-2xl dark:bg-[#040303]/90"
      >
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-full border border-[#e5d6d3] dark:border-[#A13333]/50"
            src={post.author.profileUrl || "/placeholder.jpeg"}
            alt="profile picture"
          />
          <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold">{post.author.username}</p>
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
    </>
  );
}

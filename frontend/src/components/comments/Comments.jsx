import { useParams } from "react-router";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import { formatDate } from "../../utils/dateFormatter";

export default function Comments() {
  const { postId } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (!token) return;
    async function fetchPost() {
      setLoading(true);
      const res = await fetch(
        `https://murmur-production.up.railway.app/comments/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      debugger;
      if (!res.ok) {
        console.error(data.message || "Failed to fetch comment");
      }
      setComments(data);
      setLoading(false);
    }
    fetchPost();
  }, [token, postId]);

  if (loading) return <Loading />;

  if (comments.length === 0)
    return <p className="dark:text-white">No comments yet.</p>;

  return (
    <div>
      <div className="py-4 text-lg dark:text-gray-200">
        <p>Comments ({comments.length})</p>
      </div>
      {comments && comments.length > 0 && (
        <>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="relative flex cursor-pointer flex-col gap-3 bg-white/90 p-4 transition-all duration-300 dark:bg-[#040303]/80"
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-10 w-10 rounded-full border border-[#e5d6d3] dark:border-[#A13333]/50"
                  src={
                    comment.author.profileUrl || "/placeholder.jpeg"
                  }
                  alt="profile picture"
                />
                <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">
                    {comment.author.username}
                  </p>
                  <span>·</span>
                  <span className="text-xs">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {comment.content && (
                  <p className="px-2 text-left text-lg text-gray-800 dark:text-gray-100">
                    {comment.content}
                  </p>
                )}
                {comment.imageUrl && (
                  <img
                    src={comment.imageUrl}
                    alt="comment image"
                    className="max-h-96 w-full rounded-xl object-cover"
                  />
                )}
              </div>

              <div className="mt-2 flex items-center gap-3">
                <LikeButton
                  type="comment"
                  id={comment.id}
                  likes={comment._count.commentLikes}
                  isLiked={
                    comment.commentLikes.length > 0 ? true : false
                  }
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

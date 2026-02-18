import { useAuth } from "../context/authContext";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "../components/posts/PostCard";
import Comments from "../components/comments/Comments";
import CommentForm from "../components/comments/CommmentForm";

export default function SinglePost() {
  const { user, token, authLoading } = useAuth();
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(0);

  useEffect(() => {
    if (!token) return;
    async function fetchComments() {
      debugger;
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
    }
    fetchComments();
  }, [token, postId, refreshComments]);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-2xl">
        <PostCard />
        <CommentForm setRefreshComments={setRefreshComments} />
        <Comments comments={comments} setComments={setComments} />
      </div>
    </div>
  );
}

import { useAuth } from "../context/authContext";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "../components/posts/PostCard";
import Comments from "../components/comments/Comments";
import CommentForm from "../components/comments/CommentForm";
import Loading from "../components/Loading";
import LeftSidebar from "../components/left-sidebar/LeftSidebar";

export default function SinglePost() {
  const { user, token, authLoading } = useAuth();
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mainLoading, setMainLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    async function fetchData() {
      try {
        const postRes = await fetch(
          `https://murmur-production.up.railway.app/posts/${postId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const postData = await postRes.json();
        if (!postRes.ok)
          console.error(postData.message || "Failed to fetch post");
        setPost(postData);

        const commentsRes = await fetch(
          `https://murmur-production.up.railway.app/comments/${postId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const commentsData = await commentsRes.json();
        if (!commentsRes.ok)
          console.error(
            commentsData.message || "Failed to fetch comments",
          );
        setComments(commentsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setMainLoading(false);
      }
    }

    fetchData();
  }, [token, postId, refreshComments]);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (mainLoading) return <Loading />;

  return (
    <div className="flex flex-1 flex-col items-center bg-gray-100 dark:bg-zinc-900">
      <aside className="fixed right-0 bottom-0 left-0 z-50 bg-white p-4 shadow lg:hidden dark:bg-zinc-950">
        <LeftSidebar />
      </aside>
      <div className="w-full max-w-2xl">
        <PostCard post={post} />
        <CommentForm setRefreshComments={setRefreshComments} />
        <Comments
          comments={comments}
          setRefreshComments={setRefreshComments}
          loading={loading}
        />
      </div>
    </div>
  );
}

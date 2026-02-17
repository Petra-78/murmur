import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import PostCard from "../components/posts/PostCard";
import Comments from "../components/comments/Comments";

export default function SinglePost() {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-dvh flex-col items-center overflow-hidden bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-2xl">
        <PostCard />
        <Comments />
      </div>
    </div>
  );
}

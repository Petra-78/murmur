import LikeButton from "../buttons/LikeButton";
import { formatDate } from "../../utils/dateFormatter";
import DeleteButton from "../buttons/DeleteButton";
import { useAuth } from "../../context/authContext";
import Replies from "./Replies";
import { Link } from "react-router";
import ReplyButton from "../buttons/ReplyButton";
import { useState } from "react";
import ReplyForm from "./ReplyForm";
import ShowReplies from "../buttons/ShowReplies";

export default function Comments({ comments, setRefreshComments }) {
  const { user } = useAuth();
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [showReplyId, setShowReplyId] = useState(null);

  debugger;
  if (comments.length === 0)
    return (
      <p className="mb-4 py-6 dark:text-white">No comments yet.</p>
    );

  return (
    <div>
      <div className="py-4 text-lg dark:text-gray-200">
        <p>Comments</p>
      </div>
      {comments && comments.length > 0 && (
        <>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="relative flex cursor-pointer flex-col gap-3 border-b border-b-gray-500 bg-white/90 p-4 transition-all duration-300 dark:bg-[#040303]/80"
            >
              <div className="flex items-center gap-2">
                <Link to={`/users/${comment.author.username}`}>
                  <img
                    className="h-10 w-10 rounded-full border border-[#e5d6d3] dark:border-[#A13333]/50"
                    src={
                      comment.author.profileUrl || "/placeholder.jpeg"
                    }
                    alt="profile picture"
                  />
                </Link>

                <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                  <Link to={`/users/${comment.author.username}`}>
                    <p className="font-semibold hover:font-extrabold hover:text-gray-400">
                      {comment.author.username}
                    </p>
                  </Link>

                  <span>·</span>
                  <span className="text-xs">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                {comment.author.id === user.id && (
                  <div className="ml-auto">
                    <DeleteButton
                      content={"comments"}
                      id={comment.id}
                      setRefreshComments={setRefreshComments}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {comment.content && (
                  <p className="px-2 text-left text-lg wrap-break-word whitespace-pre-wrap text-gray-800 dark:text-gray-100">
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
                <ReplyButton
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                  commentId={comment.id}
                />
                {comment.replies.length > 0 && (
                  <ShowReplies
                    showReplyId={showReplyId}
                    setShowReplyId={setShowReplyId}
                    commentId={comment.id}
                    replyLength={comment.replies.length}
                  />
                )}
              </div>
              {activeReplyId === comment.id && (
                <div>
                  <ReplyForm
                    parentId={comment.id}
                    setActiveReplyId={setActiveReplyId}
                    setRefreshComments={setRefreshComments}
                    username={comment.author.username}
                  />
                </div>
              )}

              {comment.replies.length > 0 &&
                showReplyId === comment.id && (
                  <Replies
                    replies={comment.replies}
                    setRefreshComments={setRefreshComments}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                  />
                )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

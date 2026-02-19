export default function ShowReplies({
  showReplyId,
  setShowReplyId,
  commentId,
  replyLength,
}) {
  return (
    <button
      onClick={() =>
        setShowReplyId(showReplyId === commentId ? null : commentId)
      }
      className="mt-1 ml-1 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-[#A13333] dark:text-gray-400"
    >
      {showReplyId === commentId
        ? "Hide replies"
        : `Show replies (${replyLength})`}
    </button>
  );
}

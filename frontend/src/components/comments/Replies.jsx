import { useAuth } from "../../context/authContext";
import { formatDate } from "../../utils/dateFormatter";
import LikeButton from "../buttons/LikeButton";
import DeleteButton from "../buttons/DeleteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import ReplyButton from "../buttons/ReplyButton";
import ReplyForm from "./ReplyForm";

export default function Replies({
  replies,
  setRefreshComments,
  activeReplyId,
  setActiveReplyId,
}) {
  debugger;
  const { user } = useAuth();
  return (
    <div className="mt-2 ml-8 flex flex-col gap-3">
      {replies.map((reply) => (
        <div
          key={reply.id}
          className="relative flex flex-col gap-2 rounded-xl border-l-2 border-[#A13333]/60 bg-white/80 p-3 pl-4 transition-all duration-300 hover:shadow-lg dark:bg-[#040303]/80"
        >
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 rounded-full border border-[#e5d6d3] dark:border-[#A13333]/50"
              src={reply.author.profileUrl || "/placeholder.jpeg"}
              alt="profile picture"
            />
            <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
              <Link to={`/users/${reply.author.username}`}>
                <p className="font-semibold hover:font-extrabold hover:text-gray-400">
                  {reply.author.username}
                </p>
              </Link>
              <Link to={`/users/${reply.parent.author.username}`}>
                <p className="flex items-center justify-center hover:text-[#dd5c5c]">
                  <FontAwesomeIcon icon={faCaretRight} />
                  {reply.parent.author.username}
                </p>
              </Link>
              <span>·</span>
              <span className="text-xs">
                {formatDate(reply.createdAt)}
              </span>
            </div>
            {reply.author.id === user.id && (
              <div className="ml-auto">
                <DeleteButton
                  content={"comments"}
                  id={reply.id}
                  setRefreshComments={setRefreshComments}
                  className="hover:text-red-600"
                />
              </div>
            )}
          </div>

          <div className="mt-1 flex flex-col gap-2">
            {reply.content && (
              <p className="px-2 text-left text-sm whitespace-pre-wrap text-gray-800 md:text-base dark:text-gray-100">
                {reply.content}
              </p>
            )}
            {reply.imageUrl && (
              <img
                src={reply.imageUrl}
                alt="reply image"
                className="max-h-80 w-full rounded-lg object-cover shadow-sm"
              />
            )}
          </div>

          <div className="mt-1 flex items-center gap-3">
            <LikeButton
              type="reply"
              id={reply.id}
              likes={reply._count.commentLikes}
              isLiked={reply.commentLikes.length > 0 ? true : false}
            />
            <ReplyButton
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              commentId={reply.id}
            />
          </div>
          {activeReplyId === reply.id && (
            <div>
              <ReplyForm
                parentId={reply.id}
                setActiveReplyId={setActiveReplyId}
                setRefreshComments={setRefreshComments}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

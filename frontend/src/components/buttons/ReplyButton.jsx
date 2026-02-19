import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

export default function ReplyButton({
  activeReplyId,
  setActiveReplyId,
  commentId,
}) {
  return (
    <div>
      <button
        onClick={() =>
          setActiveReplyId(
            activeReplyId === commentId ? null : commentId,
          )
        }
        className="mt-1 text-lg text-gray-500 transition-all duration-200 hover:text-[#A13333] active:scale-90 dark:text-gray-400"
      >
        <FontAwesomeIcon icon={faReply} size="sm" />
      </button>
    </div>
  );
}

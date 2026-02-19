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
        className="text-gray-800 dark:text-gray-200"
      >
        <FontAwesomeIcon icon={faReply} />
      </button>
    </div>
  );
}

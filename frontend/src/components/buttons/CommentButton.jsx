import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommentButton({ comments }) {
  return (
    <button
      className="
      flex items-end  px-2 py-1 rounded-lg transition 
      text-gray-600 dark:text-gray-300
      hover:text-[#A13333] dark:hover:text-[#B3541E]
      active:scale-95
      "
    >
      <FontAwesomeIcon icon={faComment} className="text-xl" />
      <span className="text-xs font-medium">{comments}</span>
    </button>
  );
}

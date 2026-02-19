import { useParams } from "react-router";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ReplyForm({
  parentId,
  setRefreshComments,
  setActiveReplyId,
}) {
  const { postId } = useParams();
  const { token } = useAuth();
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  async function postReply(e) {
    e.preventDefault();
    try {
      setSending(true);

      const res = await fetch(
        `http://localhost:8080/comments/reply/${postId}/${parentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        },
      );
      const data = await res.json();
      setContent("");
      setSending(false);
      setActiveReplyId(null);
      setRefreshComments((prev) => prev + 1);
    } catch (error) {
      toast.error(error.message || "Failed to send comment");
      console.error(error.message || "Failed to send comment");
      setSending(false);
    }
  }

  return (
    <div className="mt-3 w-full">
      <form
        onSubmit={(e) => postReply(e)}
        className="flex w-full items-center gap-2 px-2"
      >
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          required
          maxLength={300}
          className="w-full flex-1 resize-none overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-[#A13333] focus:outline-none dark:border-gray-600 dark:bg-[#1a1a1a] dark:text-gray-100 dark:placeholder-gray-500"
        />

        <button
          type="submit"
          disabled={sending}
          className="flex items-center justify-center rounded-full bg-[#A13333] p-3 text-white transition-all duration-200 hover:bg-[#b84747] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
        </button>
      </form>

      <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
        {content.length}/300
      </p>
    </div>
  );
}

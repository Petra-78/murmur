import { useParams } from "react-router";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function CommentForm({ setRefreshComments }) {
  const { postId } = useParams();
  const { token } = useAuth();
  const [content, setContent] = useState(null);
  const [sending, setSending] = useState(false);

  async function postComment(e) {
    e.preventDefault();
    try {
      setSending(true);
      const res = await fetch(
        `https://murmur-production.up.railway.app/comments/${postId}`,
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
      setRefreshComments((prev) => prev + 1);
    } catch (error) {
      console.error(data.message || "Failed to send comment");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => postComment(e)}>
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setContent(e.target.value)}
          required
          max={300}
        />
        <button type="submit" disabled={sending ? true : false}>
          {sending ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
        </button>
      </form>
    </div>
  );
}

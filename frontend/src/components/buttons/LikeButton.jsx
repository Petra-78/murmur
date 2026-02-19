import { useState, useEffect } from "react";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/authContext";

export default function LikeButton({ likes, type, id, isLiked }) {
  const { token } = useAuth();
  const [liked, setIsLiked] = useState(isLiked);
  const [likeNumber, setLikeNumber] = useState(likes);

  async function handleLike() {
    try {
      let url;
      debugger;
      setIsLiked(!liked);
      if (liked) setLikeNumber((prev) => prev - 1);
      if (!liked) setLikeNumber((prev) => prev + 1);

      if (type === "post") {
        url = `https://murmur-production.up.railway.app/posts/${id}/like`;
      } else if (type === "comment") {
        url = `https://murmur-production.up.railway.app/comments/${id}/like`;
      } else {
        return;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
    } catch (err) {
      setIsLiked((prev) => !prev);
      setLikeNumber((prev) => (liked ? prev + 1 : prev - 1));
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-end rounded-lg px-2 py-1 text-gray-700 transition-all active:scale-95 dark:text-gray-300"
    >
      <FontAwesomeIcon
        icon={liked ? faHeart : faHeartRegular}
        className={`text-xl transition-colors duration-200 ${liked ? "text-[#A13333]" : "text-gray-600 dark:text-gray-300"} hover:text-[#B3541E]`}
      />
      <span className="text-xs font-medium">{likeNumber}</span>
    </button>
  );
}

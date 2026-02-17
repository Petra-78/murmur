import { useState, useEffect } from "react";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/authContext";

export default function LikeButton({ likes, type, id, isLiked }) {
  const { token } = useAuth();
  const [liked, setIsLiked] = useState(isLiked);
  const [likeNumber, setLikeNumber] = useState(likes);
  debugger;

  async function handleLike() {
    try {
      let url;

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

      if (data.likedPost || data.likedComment) {
        setIsLiked(true);
        setLikeNumber((prev) => prev + 1);
      } else if (data.dislikedPost || data.dislikedComment) {
        setIsLiked(false);
        setLikeNumber((prev) => prev - 1);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleLike}
      className="
      flex items-end  px-2 py-1 rounded-lg transition-all
      text-gray-600 dark:text-gray-300
      active:scale-95
      "
    >
      <FontAwesomeIcon
        icon={liked ? faHeart : faHeartRegular}
        className={`
          text-xl transition-colors duration-200
          ${liked ? "text-[#A13333] dark:text-[#B3541E]" : "text-gray-400  dark:text-gray-300"}
          hover:text-[#B3541E] dark:hover:text-[#A13333]
        `}
      />
      <span className="text-xs font-medium">{likeNumber}</span>
    </button>
  );
}

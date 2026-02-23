import { useFollow } from "../../context/followContext";
import { useEffect } from "react";

export default function FollowButton({ userData }) {
  const { followingMap, follow, unfollow, setInitialFollowState } =
    useFollow();

  const username = userData.username;

  useEffect(() => {
    if (followingMap[username] === undefined) {
      setInitialFollowState(username, userData.followers.length > 0);
    }
  }, [username]);

  const isFollowing = followingMap[username];

  return (
    <button
      onClick={() =>
        isFollowing ? unfollow(username) : follow(username)
      }
      className={`min-w-30 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
        isFollowing
          ? "bg-[#f3ece7] text-gray-800 hover:bg-[#e9d8d3] dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          : "bg-[#A13333] text-white hover:bg-[#b84747]"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

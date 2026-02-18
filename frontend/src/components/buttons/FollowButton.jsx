import { useParams } from "react-router";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

export default function FollowButton({ userData }) {
  const { token } = useAuth();
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(
    userData.followers.length > 0 ? true : false,
  );

  async function followUser(e) {
    e.preventDefault();
    setIsFollowing(true);
    try {
      const res = await fetch(
        `https://murmur-production.up.railway.app/users/${username}/follow`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      setIsFollowing(false);
    }
  }

  async function unfollowUser(e) {
    e.preventDefault();
    setIsFollowing(false);
    try {
      const res = await fetch(
        `https://murmur-production.up.railway.app/users/${username}/unfollow`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      setIsFollowing(true);
    }
  }

  return (
    <button
      onClick={(e) => (isFollowing ? unfollowUser(e) : followUser(e))}
      className={`min-w-50 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
        isFollowing
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          : "bg-[#A13333] text-white hover:bg-[#b84747]"
      } `}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

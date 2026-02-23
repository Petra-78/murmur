import { createContext, useContext, useState } from "react";
import { useAuth } from "./authContext";

const FollowContext = createContext(null);

export const FollowProvider = ({ children }) => {
  const { token } = useAuth();
  const [followingMap, setFollowingMap] = useState({});

  const follow = async (username) => {
    setFollowingMap((prev) => ({ ...prev, [username]: true }));

    try {
      await fetch(
        `https://murmur-production.up.railway.app/users/${username}/follow`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (err) {
      setFollowingMap((prev) => ({ ...prev, [username]: false }));
    }
  };

  const unfollow = async (username) => {
    setFollowingMap((prev) => ({ ...prev, [username]: false }));

    try {
      await fetch(
        `https://murmur-production.up.railway.app/users/${username}/unfollow`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (err) {
      setFollowingMap((prev) => ({ ...prev, [username]: true }));
    }
  };

  const setInitialFollowState = (username, value) => {
    setFollowingMap((prev) => ({ ...prev, [username]: value }));
  };

  return (
    <FollowContext.Provider
      value={{
        followingMap,
        follow,
        unfollow,
        setInitialFollowState,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => useContext(FollowContext);

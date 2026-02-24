import { useState, useEffect } from "react";
import FollowButton from "../buttons/FollowButton";
import SendMessageButton from "../buttons/SendMessageButton";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ProfileImage } from "./ProfileImage";

export default function ProfileInfo({
  userData,
  setUserData,
  setPosts,
}) {
  const { user, token, setUser } = useAuth();

  const [nickName, setNickName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const isOwnProfile = user?.username === userData?.username;

  useEffect(() => {
    if (userData) {
      setNickName(userData.nickName || "");
      setBio(userData.bio || "");
    }
  }, [userData]);

  async function updateUser(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(
        "https://murmur-production.up.railway.app/users/me/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bio, nickName }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to update user");
        return;
      }

      setUserData((prev) => ({
        ...prev,
        ...data,
      }));

      setUser((prevUser) => ({
        ...prevUser,
        bio: data.bio,
        nickName: data.nickName,
      }));

      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update user");
    } finally {
      setSaving(false);
    }
  }

  if (!userData)
    return <p className="dark:text-white">Failed to fetch user.</p>;

  return (
    <div className="w-full max-w-3xl">
      <div className="grid w-full grid-cols-[1fr_2fr] grid-rows-[min_1fr_min] gap-3 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-[min_2fr_min] md:grid-rows-[1fr_min] md:items-center md:gap-4 dark:bg-[#040303]/90">
        <div className="flex items-center justify-center md:justify-start">
          <ProfileImage
            profile={userData}
            setUserData={setUserData}
            setPosts={setPosts}
          />
        </div>

        <div className="flex w-full flex-col items-center gap-4 text-center md:flex-1 md:items-center md:text-center">
          <div className="mb-2 w-full dark:text-white">
            <h2 className="text-md truncate text-center font-bold text-gray-900 md:text-xl dark:text-gray-100">
              {userData.username}
            </h2>

            {isEditing && isOwnProfile ? (
              <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                maxLength={60}
                placeholder="Add nickname..."
                className="mt-1 w-full rounded-lg border px-3 py-1 text-center text-sm"
              />
            ) : userData.nickName ? (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {userData.nickName}
              </p>
            ) : isOwnProfile ? (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-1 text-sm text-gray-400 hover:text-[#A13333]"
              >
                Add nickname...
              </button>
            ) : null}
          </div>

          <div className="flex w-full justify-around gap-4 text-sm md:justify-center md:gap-12 dark:text-white">
            <div className="flex flex-col items-center">
              <p className="text-[12px] font-semibold md:text-[15px]">
                Posts
              </p>
              <p className="text-sm md:text-lg">
                {userData._count?.posts || 0}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[12px] font-semibold md:text-[15px]">
                Followers
              </p>
              <p className="text-sm md:text-lg">
                {userData._count?.followers || 0}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[12px] font-semibold md:text-[15px]">
                Following
              </p>
              <p className="text-sm md:text-lg">
                {userData._count?.following || 0}
              </p>
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <div className="col-span-2 row-start-1 flex justify-end gap-2 self-start md:col-start-3">
            {isEditing && (
              <button
                onClick={updateUser}
                className="rounded-xl bg-[#A13333] px-4 py-1 text-white hover:bg-[#821f25]"
              >
                {saving ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  "Save"
                )}
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1 text-sm hover:text-[#A13333] dark:text-gray-400"
            >
              {isEditing ? (
                "Cancel"
              ) : (
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              )}
            </button>
          </div>
        )}

        <div className="col-span-2 md:col-span-3 md:col-start-1 md:row-span-2 md:row-start-3 dark:text-white">
          {isEditing && isOwnProfile ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={1}
              maxLength={200}
              className="w-full resize-none rounded-xl border px-3 py-2 text-sm dark:text-white"
            />
          ) : userData.bio ? (
            <p className="text-left text-sm dark:text-white">
              {userData.bio}
            </p>
          ) : isOwnProfile ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-gray-400 hover:text-[#A13333]"
            >
              Add bio...
            </button>
          ) : null}
        </div>
        {user && user.username !== userData.username && (
          <div className="col-span-2 row-start-3 flex w-full justify-evenly gap-4 md:col-start-2 md:row-start-2">
            <FollowButton userData={userData} className="w-full" />
            <SendMessageButton selectedUserId={userData.id} />
          </div>
        )}
      </div>
    </div>
  );
}

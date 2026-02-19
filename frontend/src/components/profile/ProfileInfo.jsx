import { useState, useEffect } from "react";
import FollowButton from "../buttons/FollowButton";
import SendMessageButton from "../buttons/SendMessageButton";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ProfileInfo({ userData }) {
  const { user, token } = useAuth();

  const [profile, setProfile] = useState(userData || null);
  const [nickName, setNickName] = useState(userData?.nickName || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const isOwnProfile = user?.username === profile?.username;

  useEffect(() => {
    if (userData) {
      setProfile(userData);
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

      setProfile((p) => ({ ...(p || {}), ...data }));
      setNickName(data.nickName ?? nickName);
      setBio(data.bio ?? bio);

      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update user");
    } finally {
      setSaving(false);
    }
  }

  if (!profile)
    return <p className="dark:text-white">Failed to fetch user.</p>;

  return (
    <div className="mt-3 w-full max-w-2xl">
      <div className="grid w-full grid-cols-[1fr_2fr_min] grid-rows-[1fr_min] items-center gap-4 rounded-2xl bg-white p-6 shadow-lg transition-colors duration-300 sm:flex-row sm:items-start dark:bg-[#040303]/90">
        <div className="shrink-0">
          <img
            src={profile.profileUrl || "/placeholder.jpeg"}
            alt="profile picture"
            className="h-24 w-24 rounded-full border border-gray-300 object-cover sm:h-28 sm:w-28 dark:border-[#A13333]/50"
          />
        </div>

        <div className="flex w-full flex-1 flex-col items-center gap-4 sm:items-center">
          <div className="mb-2">
            <h2 className="truncate text-center text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100">
              {profile.username}
            </h2>

            {isEditing && isOwnProfile ? (
              <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                maxLength={60}
                placeholder="Add nickname..."
                className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1 text-center text-sm outline-none focus:border-[#A13333] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            ) : profile.nickName ? (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {profile.nickName}
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

          <div className="flex w-full justify-center gap-12 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Posts
              </p>
              <p className="text-lg">{profile._count?.posts || 0}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Followers
              </p>
              <p className="text-lg">
                {profile._count?.followers || 0}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Following
              </p>
              <p className="text-lg">
                {profile._count?.following || 0}
              </p>
            </div>
          </div>

          {profile && user && user.username !== profile.username && (
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <FollowButton userData={profile} className="w-full" />
              <SendMessageButton />
            </div>
          )}
        </div>

        {isOwnProfile && (
          <div className="flex justify-end gap-2">
            {isEditing && (
              <button
                onClick={updateUser}
                className="rounded bg-[#A13333] px-4 py-1 text-white hover:bg-[#821f25]"
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
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#A13333] dark:text-gray-300"
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

        <div className="col-span-3">
          {isEditing && isOwnProfile ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write your bio..."
              rows={1}
              maxLength={200}
              className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#A13333] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          ) : profile.bio ? (
            <p className="col-span-3 px-3 text-left text-sm text-gray-700 dark:text-gray-300">
              {profile.bio}
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
      </div>
    </div>
  );
}

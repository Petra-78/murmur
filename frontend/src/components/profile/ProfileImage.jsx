import { useState, useRef } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { check } from "prettier";

export function ProfileImage({ profile, setUserData, setPosts }) {
  const { user, token, setUser } = useAuth();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef(null);

  const isOwnProfile = user?.username === profile?.username;

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleCancel() {
    setPreview(null);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSave() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);

    try {
      const res = await fetch(
        "http://localhost:8080/users/me/update/pfp",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.message || "Failed to upload profile picture",
        );
        return;
      }

      setUserData((prev) => ({
        ...prev,
        profileUrl: data.profileUrl,
      }));

      setPosts((prev) =>
        prev.map((post) =>
          post.author.username === profile.username
            ? {
                ...post,
                author: {
                  ...post.author,
                  profileUrl: data.profileUrl,
                },
              }
            : post,
        ),
      );

      if (isOwnProfile) {
        setUser((prevUser) => ({
          ...prevUser,
          profileUrl: data.profileUrl,
        }));
      }

      setPreview(null);
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";

      toast.success("Profile picture updated succesfully!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="group relative h-20 w-20 cursor-pointer md:h-40 md:w-40">
        <img
          src={preview || profile?.profileUrl || "/placeholder.jpeg"}
          alt="Profile picture"
          className="h-20 w-20 rounded-full object-cover md:h-40 md:w-40"
        />

        {isOwnProfile && (
          <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Change
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      {preview && (
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            disabled={uploading}
            className="flex items-center justify-center rounded-lg bg-[#A13333] px-4 py-2 text-white transition-all duration-200 hover:bg-[#b84747] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faX} />
          </button>

          <button
            onClick={handleSave}
            disabled={uploading}
            className="flex items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:bg-green-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

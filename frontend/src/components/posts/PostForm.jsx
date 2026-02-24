import {
  faImage,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import GifPicker from "../buttons/GifPicker";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [gifUrl, setGifUrl] = useState(null);
  const [sending, setSending] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  async function uploadPost(e) {
    e.preventDefault();
    setSending(true);
    const formData = new FormData();
    debugger;

    if (content) formData.append("content", content);
    if (imageFile) formData.append("file", imageFile);
    if (gifUrl) formData.append("gifUrl", gifUrl);

    const maxSize = 5 * 1024 * 1024;
    if (imageFile && imageFile.size > maxSize) {
      toast.error("File is too large. Maximum size is 5MB.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch(
        `https://murmur-production.up.railway.app/posts`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post");
      navigate("/");
      setContent("");
      setImageFile(null);
      setGifUrl(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl flex-1">
      <form
        onSubmit={uploadPost}
        className="flex w-full flex-col gap-4 rounded-b-2xl bg-white p-4 shadow-md dark:bg-[#040303]"
      >
        <textarea
          placeholder="What's on your mind?..."
          value={content}
          maxLength={2000}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm transition outline-none focus:border-[#A13333] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-300"
          rows={4}
        />

        {(imageFile || gifUrl) && (
          <div className="flex w-full items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-950">
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setGifUrl(null);
                }}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-xs font-bold text-white backdrop-blur transition hover:scale-110 hover:bg-[#A13333]"
              >
                ✕
              </button>
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="block max-h-125 w-full rounded-xl object-cover"
                />
              )}
              {gifUrl && (
                <img
                  src={gifUrl}
                  alt="GIF preview"
                  className="block max-h-125 w-full rounded-xl object-cover"
                />
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <label
              htmlFor="file"
              className="cursor-pointer rounded-full p-2 text-gray-500 transition hover:text-[#A13333] dark:text-gray-400"
            >
              <input
                type="file"
                id="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setGifUrl(null);
                    e.target.value = "";
                  }
                }}
              />
              <FontAwesomeIcon icon={faImage} size="lg" />
            </label>

            <button
              type="button"
              onClick={() => setShowGifPicker(true)}
              className="rounded-full p-2 text-gray-500 transition hover:text-[#A13333] dark:text-gray-400"
            >
              GIF
            </button>

            <p className="ml-6 text-xs text-gray-400 dark:text-gray-500">
              {content.length}/2000
            </p>
          </div>

          <button
            type="submit"
            disabled={(!content && !imageFile && !gifUrl) || sending}
            className="rounded-xl bg-[#A13333] px-6 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>

      {showGifPicker && (
        <GifPicker
          onSelectGif={(url) => {
            setGifUrl(url);
            setImageFile(null);
            setShowGifPicker(false);
          }}
          onClose={() => setShowGifPicker(false)}
        />
      )}
    </div>
  );
}

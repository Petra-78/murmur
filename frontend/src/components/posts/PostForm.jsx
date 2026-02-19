import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();
  debugger;

  async function uploadPost(e) {
    debugger;
    e.preventDefault();

    const formData = new FormData();

    if (content) formData.append("content", content);
    if (imageFile) formData.append("file", imageFile);
    const res = await fetch(
      `https://murmur-production.up.railway.app/posts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    if (!res.ok) {
      toast.error(error.message || "Failed to send message");
      return;
    }
    setContent("");
    setImageFile("");
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={(e) => uploadPost(e)}>
        <textarea
          name="content"
          id="content"
          placeholder="Whats on your mind?..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {imageFile && (
          <div className="relative inline-block">
            <button
              className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 p-1 text-sm font-bold text-white transition-all duration-200 hover:scale-110 hover:bg-[#A13333]"
              onClick={() => setImageFile(null)}
            >
              x
            </button>
            <img
              className="max-h-64 w-auto rounded-xl object-cover shadow-md"
              src={URL.createObjectURL(imageFile)}
              alt="preview"
            />
          </div>
        )}
        <div>
          <label htmlFor="file">
            <input
              type="file"
              id="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  e.target.value = "";
                }
              }}
              hidden
            />
            <FontAwesomeIcon icon={faImage} />
          </label>

          <p>{content.length}/2000</p>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

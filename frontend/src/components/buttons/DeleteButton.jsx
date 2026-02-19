import {
  faSpinner,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function DeleteButton({
  content,
  id,
  setRefreshComments,
}) {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  async function deleteContent(e) {
    setDeleting(true);
    e.preventDefault();
    let url;
    if (content === "comments")
      url = `https://murmur-production.up.railway.app/comments/${id}`;
    if (content === "posts")
      url = `http://localhost:8080/posts/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to delete");
      console.log(`Failed to delete`);
    }
    if (content === "comments") {
      setRefreshComments((prev) => prev + 1);
    }
    if (content === "posts") {
      navigate(-1);
    }
    setDeleting(false);
    console.log(`Deleted: ${data}`);
  }
  return (
    <button
      onClick={(e) => deleteContent(e)}
      className="text-zinc-800 dark:text-gray-300"
      disabled={deleting ? true : false}
    >
      {deleting ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <FontAwesomeIcon icon={faTrashCan} />
      )}
    </button>
  );
}

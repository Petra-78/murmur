import {
  faSpinner,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

export default function DeleteButton({
  content,
  id,
  setRefreshComments,
}) {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState(false);

  async function deleteContent(e) {
    setDeleting(true);
    e.preventDefault();
    let url;
    if (content === "comments")
      url = `https://murmur-production.up.railway.app/comments/${id}`;
    if (content === "posts")
      url = `https://murmur-production.up.railway.app/posts/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setRefreshComments((prev) => prev + 1);
    setDeleting(false);
    console.log(`Deleted: ${data}`);

    if (!res.ok) {
      console.log(`Failed to delete`);
    }
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

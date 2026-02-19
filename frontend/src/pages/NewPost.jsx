import PostForm from "../components/posts/PostForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function NewPost() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full flex-1 justify-center">
        <div className="flex w-full max-w-2xl flex-col items-center">
          <div className="w-full border-b border-[#A13333] bg-white/90 p-3 dark:bg-[#040303]/90">
            <button
              className="flex items-center gap-3 text-zinc-900 transition-colors duration-200 hover:text-[#A13333] dark:text-gray-300"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to posts
            </button>
          </div>

          <PostForm />
        </div>
      </div>
    </>
  );
}

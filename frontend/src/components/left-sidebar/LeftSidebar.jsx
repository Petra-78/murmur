import {
  faCircleUser,
  faHouse,
  faMessage,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPerson,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { useAuth } from "../../context/authContext";

export default function LeftSidebar() {
  const { user } = useAuth();

  return (
    <div className="flex w-full flex-row items-center justify-around gap-y-4 bg-white text-lg lg:flex-col lg:items-start lg:justify-start dark:bg-zinc-950 dark:text-white">
      <Link to={"/"} className="w-full">
        <div className="flex items-center justify-center rounded-xl px-3 py-2 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-100 active:scale-95 lg:justify-start lg:gap-3 dark:hover:bg-zinc-800">
          <FontAwesomeIcon className="text-xl" icon={faHouse} />
          <span className="hidden text-sm font-medium lg:block">
            Home
          </span>
        </div>
      </Link>
      <Link to={"/posts/new"} className="w-full">
        <div className="flex items-center justify-center rounded-xl px-3 py-2 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-100 active:scale-95 lg:justify-start lg:gap-3 dark:hover:bg-zinc-800">
          <FontAwesomeIcon className="text-xl" icon={faPlusSquare} />
          <span className="hidden text-sm font-medium lg:block">
            New Post
          </span>
        </div>
      </Link>
      <Link to={"/users/search"} className="w-full">
        <div className="flex items-center justify-center rounded-xl px-3 py-2 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-100 active:scale-95 lg:justify-start lg:gap-3 dark:hover:bg-zinc-800">
          <FontAwesomeIcon className="text-xl" icon={faSearch} />
          <span className="hidden text-sm font-medium lg:block">
            Search
          </span>
        </div>
      </Link>
      <Link to={`/users/${user.username}`} className="w-full">
        <div className="flex items-center justify-center rounded-xl px-3 py-2 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-100 active:scale-95 lg:justify-start lg:gap-3 dark:hover:bg-zinc-800">
          <FontAwesomeIcon className="text-xl" icon={faCircleUser} />
          <span className="hidden text-sm font-medium lg:block">
            Profile
          </span>
        </div>
      </Link>
      <Link to={`/chats`} className="w-full">
        <div className="flex items-center justify-center rounded-xl px-3 py-2 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-100 active:scale-95 lg:justify-start lg:gap-3 dark:hover:bg-zinc-800">
          <FontAwesomeIcon className="text-xl" icon={faMessage} />
          <span className="hidden text-sm font-medium lg:block">
            Messages
          </span>
        </div>
      </Link>
    </div>
  );
}

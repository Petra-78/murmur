import { Link } from "react-router-dom";
import FollowButton from "../buttons/FollowButton";
import { useAuth } from "../../context/authContext";

export default function MostFollowed({ popularUsers }) {
  const { user } = useAuth();
  return (
    <div className="flex flex-col bg-white p-4 dark:bg-zinc-950">
      <h2 className="text-lg font-bold">Most Popular Users</h2>
      <ul className="mt-2">
        {popularUsers.map((u) => (
          <li
            key={u.id}
            className="flex items-center justify-between rounded-2xl hover:bg-zinc-100 sm:gap-4 sm:px-3 dark:hover:bg-zinc-800"
          >
            <Link to={`/users/${u.username}`}>
              <button className="flex w-full items-center justify-start gap-2 truncate rounded-lg px-2 py-2 text-left transition-colors">
                <img
                  src={u.profileUrl || "/placeholder.jpeg"}
                  alt="User profile"
                  className="h-6 w-6 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
                />
                <span className="max-w-25 truncate text-gray-800 dark:text-gray-200">
                  {u.username}
                </span>
              </button>
            </Link>
            {u.username !== user.username && (
              <FollowButton userData={u} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

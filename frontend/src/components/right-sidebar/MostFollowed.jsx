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
            className="flex items-center justify-between rounded-2xl px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Link
              to={`/users/${u.username}`}
              className="flex min-w-0 items-center gap-2 py-2"
            >
              <img
                src={u.profileUrl || "/placeholder.jpeg"}
                alt="User profile"
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
              <span className="max-w-22 min-w-0 truncate text-gray-800 dark:text-gray-200">
                {u.username}
              </span>
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

import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import FollowButton from "../components/buttons/FollowButton";
import { Link } from "react-router";

export default function UserSearch() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      debugger;
      try {
        const res = await fetch(
          "https://murmur-production.up.railway.app/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          toast.error("Failed to fetch users");
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    if (token) fetchUsers();
  }, [token]);

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-1 justify-center">
      <div className="flex w-full max-w-2xl flex-col rounded-lg bg-white p-2 shadow-md md:p-4 dark:bg-zinc-950">
        <h2 className="my-4 truncate text-xl font-semibold text-gray-800 dark:text-gray-200">
          Users
        </h2>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={loading}
          className="mb-4 w-full rounded-lg border border-gray-300 p-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 md:px-3 md:py-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-gray-200 dark:placeholder-gray-400"
        />

        {loading && (
          <p className="mb-2 truncate text-sm text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        )}
        {!loading && error && (
          <p className="mb-2 truncate text-sm text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
        {!loading && !error && filteredUsers.length === 0 && (
          <p className="mb-2 truncate text-sm text-gray-500 dark:text-gray-400">
            No users found
          </p>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
            {filteredUsers.map((u) => (
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
                    <span className="truncate text-gray-800 dark:text-gray-200">
                      {u.username}
                    </span>
                  </button>
                </Link>

                <FollowButton userData={u} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

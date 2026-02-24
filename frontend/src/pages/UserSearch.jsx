import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import FollowButton from "../components/buttons/FollowButton";
import { Link } from "react-router";
import LeftSidebar from "../components/left-sidebar/LeftSidebar";
import RightSidebar from "../components/right-sidebar/RightSidebar";

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
    <div className="w-full flex-1 bg-gray-100 dark:bg-zinc-900">
      <div className="max-w-8xl grid w-full grid-cols-1 justify-center gap-6 px-4 py-2 lg:grid-cols-[minmax(170px,300px)_minmax(400px,850px)_350px]">
        <aside className="hidden h-min w-full lg:flex">
          <div className="sticky bottom-0 w-full rounded-xl bg-white p-4 shadow-sm md:top-23 dark:bg-zinc-950 dark:text-white">
            <LeftSidebar />
          </div>
        </aside>

        <aside className="fixed right-0 bottom-0 left-0 z-50 bg-white p-4 shadow lg:hidden dark:bg-zinc-950">
          <LeftSidebar />
        </aside>
        <div className="flex flex-1 justify-center">
          <div className="flex h-[75vh] w-full max-w-3xl flex-col rounded-lg bg-white p-4 shadow-md lg:h-[82vh] dark:bg-zinc-950">
            <h2 className="my-4 truncate text-xl font-semibold text-gray-800 dark:text-gray-200">
              Users
            </h2>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
              className="mb-5 w-full rounded-lg border border-gray-300 p-2 pl-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 md:px-3 md:py-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-gray-200 dark:placeholder-gray-400"
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
              <ul className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
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
                        <span className="max-w-25 truncate text-gray-800 dark:text-gray-200">
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
        <aside className="hidden max-w-md lg:block">
          <div className="rounded-2xl bg-white p-2 shadow-sm dark:bg-zinc-950">
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import MostFollowed from "./MostFollowed";
import LatestUsers from "./LatestUsers";
import Loading from "../Loading";

export default function RightSidebar() {
  const { token } = useAuth();
  const [latestUsers, setLatestUsers] = useState([]);
  const [popularUsers, setPopularUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLatestUsers() {
      setLoading(true);
      const res = await fetch(
        "https://murmur-production.up.railway.app/users/recent",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch latest users");
        return console.error(
          data.message || "Failed to fetch latest users",
        );
      }
      setLatestUsers(data);
      setLoading(false);
    }
    fetchLatestUsers();
  }, []);

  useEffect(() => {
    async function fetchPopularUsers() {
      setLoading(true);
      const res = await fetch(
        "https://murmur-production.up.railway.app/users/popular",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch popular users");
        return console.error(
          data.message || "Failed to fetch popular users",
        );
      }
      setPopularUsers(data);
      setLoading(false);
    }
    fetchPopularUsers();
  }, []);

  if (loading) return <Loading className="text-[8px]" />;
  return (
    <div className="flex-col gap-4 rounded-2xl bg-white lg:flex dark:bg-zinc-950 dark:text-white">
      <MostFollowed popularUsers={popularUsers} />
      <LatestUsers latestUsers={latestUsers} />
    </div>
  );
}

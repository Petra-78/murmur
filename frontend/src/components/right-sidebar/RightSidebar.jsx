import { useOutletContext } from "react-router-dom";
import MostFollowed from "./MostFollowed";
import LatestUsers from "./LatestUsers";
import Loading from "../Loading";

export default function RightSidebar() {
  const { latestUsers, popularUsers, loading } = useOutletContext();
  if (loading) return <Loading className="text-[8px]" />;
  return (
    <div className="flex-col gap-4 rounded-2xl bg-white lg:flex dark:bg-zinc-950 dark:text-white">
      <MostFollowed popularUsers={popularUsers} />
      <LatestUsers latestUsers={latestUsers} />
    </div>
  );
}

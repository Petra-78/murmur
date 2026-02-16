import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="h-dvh flex flex-col bg-gray-100 overflow-hidden p-1">
      <h1>Hi!</h1>
    </div>
  );
}

import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/nav/Navbar";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/authContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function App() {
  const { token, authLoading } = useAuth();
  const [latestUsers, setLatestUsers] = useState([]);
  const [popularUsers, setPopularUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLatestUsers() {
      if (!token) return;
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
  }, [token]);

  useEffect(() => {
    async function fetchPopularUsers() {
      if (!token) return;
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
  }, [token]);

  if (authLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-zinc-900">
        <Navbar />
        <Outlet
          className="min-h-0 flex-1"
          context={{
            latestUsers,
            popularUsers,
            loading,
          }}
        />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;

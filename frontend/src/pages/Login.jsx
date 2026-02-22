import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { Link } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        "https://murmur-production.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      login(data.token, data.user);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        "https://murmur-production.up.railway.app/login/guest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      login(data.token, data.user);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-[#fdf8f6] via-[#f7e9e8] to-[#f3ece7] p-4 transition-colors duration-500 dark:from-[#040303] dark:via-[#1a0a0a] dark:to-[#040303]">
      <div className="absolute top-12 -left-8 h-80 w-80 rounded-full bg-[#FADADD]/20 bg-linear-to-tr opacity-40 blur-3xl" />

      <div className="absolute right-10 -bottom-10 h-72 w-72 rounded-full bg-[#FFE5B4]/30 bg-linear-to-br opacity-30 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-[#e5d6d3] bg-white/80 p-10 text-gray-800 transition-colors duration-500 dark:border-[#A13333]/30 dark:bg-[#040303]/50 dark:text-gray-100">
        <h2 className="mb-9 text-center text-3xl font-semibold tracking-wide">
          Welcome to Murmur
        </h2>

        <form className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-[#d9c2be] bg-white px-4 py-3 placeholder-gray-400 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#B3541E] dark:border-[#A13333]/40 dark:bg-[#2a0f0f] dark:placeholder-gray-500 dark:focus:ring-[#A13333]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-xl border border-[#d9c2be] bg-white px-4 py-3 placeholder-gray-400 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#B3541E] dark:border-[#A13333]/40 dark:bg-[#2a0f0f] dark:placeholder-gray-500 dark:focus:ring-[#A13333]"
          />

          {error && (
            <p className="mb-4 text-left text-sm text-red-500 dark:text-[#A13333]">
              {error}
            </p>
          )}

          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="mt-2 transform rounded-xl bg-linear-to-r from-[#B3541E] to-[#A13333] py-3 font-medium tracking-wide text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98] dark:from-[#A13333] dark:to-[#B3541E]"
          >
            Login
          </button>

          <p>OR</p>
          <button
            onClick={(e) => handleGuestSubmit(e)}
            type="submit"
            className="mt-2 transform rounded-xl bg-[#d43939] py-3 font-medium tracking-wide text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Login as Guest
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="font-medium text-[#A13333] transition hover:text-[#B3541E] dark:text-[#B3541E] dark:hover:text-[#A13333]"
          >
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
}

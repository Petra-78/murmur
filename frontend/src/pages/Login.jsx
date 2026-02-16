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
  return (
    <div
      className="
    relative flex-1 flex items-center justify-center overflow-hidden p-4 transition-colors duration-500
    bg-linear-to-br 
    from-[#fdf8f6] via-[#f7e9e8] to-[#f3ece7]
    dark:from-[#040303] dark:via-[#1a0a0a] dark:to-[#040303]
  "
    >
      <div
        className="
  absolute w-80 h-80 rounded-full blur-3xl opacity-40 top-12 -left-8
  bg-linear-to-tr bg-[#FADADD]/20

"
      />

      <div
        className="
  absolute w-72 h-72 rounded-full blur-3xl opacity-30 -bottom-10 right-10
  bg-linear-to-br bg-[#FFE5B4]/30 

"
      />

      <div
        className="
      relative rounded-3xl w-full max-w-md p-10 
      transition-colors duration-500

      bg-white/80 border border-[#e5d6d3] text-gray-800
      dark:bg-[#040303]/50 dark:border-[#A13333]/30 dark:text-gray-100
    "
      >
        <h2 className="text-3xl font-semibold tracking-wide text-center mb-9">
          Welcome to Murmur
        </h2>

        {error && (
          <p className="text-red-500 dark:text-[#A13333] text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
          px-4 py-3 rounded-xl transition outline-none

          bg-white border border-[#d9c2be] placeholder-gray-400
          focus:ring-2 focus:ring-[#B3541E] focus:border-transparent

          dark:bg-[#2a0f0f] dark:border-[#A13333]/40 
          dark:placeholder-gray-500 
          dark:focus:ring-[#A13333]
          "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
          px-4 py-3 rounded-xl transition outline-none

          bg-white border border-[#d9c2be] placeholder-gray-400
          focus:ring-2 focus:ring-[#B3541E] focus:border-transparent

          dark:bg-[#2a0f0f] dark:border-[#A13333]/40 
          dark:placeholder-gray-500 
          dark:focus:ring-[#A13333]
          "
          />

          <button
            type="submit"
            className="
          mt-2 py-3 rounded-xl font-medium tracking-wide transition transform shadow-lg

          bg-linear-to-r from-[#B3541E] to-[#A13333] text-white
          hover:scale-[1.02] active:scale-[0.98]

          dark:from-[#A13333] dark:to-[#B3541E]
          "
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="
          font-medium transition

          text-[#A13333] hover:text-[#B3541E]
          dark:text-[#B3541E] dark:hover:text-[#A13333]
          "
          >
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
}

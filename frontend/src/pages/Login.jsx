import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-[#fdf8f6] via-[#f7e9e8] to-[#f3ece7] p-3 transition-colors duration-500 sm:p-4 dark:from-[#040303] dark:via-[#1a0a0a] dark:to-[#040303]">
      <div className="absolute top-12 -left-8 h-60 w-60 rounded-full bg-[#FADADD]/20 opacity-40 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute right-10 -bottom-10 h-56 w-56 rounded-full bg-[#FFE5B4]/30 opacity-30 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative w-full max-w-md rounded-3xl border border-[#e5d6d3] bg-white/80 p-6 text-gray-800 transition-colors duration-500 sm:p-10 dark:border-[#A13333]/30 dark:bg-[#040303]/50 dark:text-gray-100">
        <h2 className="mb-6 text-center text-2xl font-semibold tracking-wide sm:mb-9 sm:text-3xl">
          Welcome to Murmur
        </h2>

        <form className="flex flex-col gap-4 sm:gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-[#d9c2be] bg-white px-3 py-2.5 text-sm placeholder-gray-400 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#B3541E] sm:px-4 sm:py-3 sm:text-base dark:border-[#A13333]/40 dark:bg-[#2a0f0f] dark:placeholder-gray-500 dark:focus:ring-[#A13333]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#d9c2be] bg-white px-3 py-2.5 pr-10 text-sm placeholder-gray-400 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#B3541E] sm:px-4 sm:py-3 sm:text-base dark:border-[#A13333]/40 dark:bg-[#2a0f0f] dark:placeholder-gray-500 dark:focus:ring-[#A13333]"
            />

            {password && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500 transition hover:text-[#A13333] dark:text-gray-400 dark:hover:text-[#B3541E]"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </button>
            )}
          </div>

          {error && (
            <p className="text-left text-xs text-red-500 sm:text-sm dark:text-[#A13333]">
              {error}
            </p>
          )}

          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="mt-1 rounded-xl bg-linear-to-r from-[#B3541E] to-[#A13333] py-2.5 text-sm font-medium tracking-wide text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98] sm:mt-2 sm:py-3 sm:text-base dark:from-[#A13333] dark:to-[#B3541E]"
          >
            Login
          </button>

          <p className="text-center text-xs opacity-70 sm:text-sm">
            OR
          </p>

          <button
            onClick={(e) => handleGuestSubmit(e)}
            type="submit"
            className="rounded-xl bg-[#d43939] py-2.5 text-sm font-medium tracking-wide text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98] sm:py-3 sm:text-base"
          >
            Login as Guest
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-600 sm:mt-6 sm:text-sm dark:text-gray-400">
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

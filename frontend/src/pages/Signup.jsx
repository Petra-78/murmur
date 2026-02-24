import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateUsername = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Username is required";
    }
    if (trimmed.includes(" ")) {
      return "Username cannot contain spaces";
    }
    if (trimmed !== trimmed.toLowerCase()) {
      return "Username must be lowercase only";
    }
    if (trimmed.length < 3 || trimmed.length > 20) {
      return "Username must be between 3 and 20 characters";
    }
    if (!/^[a-z0-9._-]+$/.test(trimmed)) {
      return "Username can only contain lowercase letters, numbers, '.', '_' and '-'";
    }

    return "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email address";
    return "";
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{6,}$/;
    if (!passwordRegex.test(value))
      return "Password must be at least 6 characters long and include one uppercase letter and one special character";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        "https://murmur-production.up.railway.app/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setUsernameError("");
          setEmailError("");
          setPasswordError("");

          data.errors.forEach((err) => {
            if (err.path === "username") {
              setUsernameError(err.msg);
            }
            if (err.path === "email") {
              setEmailError(err.msg);
            }
            if (err.path === "password") {
              setPasswordError(err.msg);
            }
          });

          return;
        }

        throw new Error(data.message || "Signup failed");
      }

      if (data.token) {
        login(data.token, data.user);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-[#fdf8f6] via-[#f7e9e8] to-[#f3ece7] p-3 transition-colors duration-500 sm:p-4 dark:from-[#040303] dark:via-[#1a0a0a] dark:to-[#040303]">
      <div className="absolute top-10 -left-8 h-56 w-56 rounded-full bg-[#FADADD]/20 opacity-40 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute right-8 -bottom-10 h-52 w-52 rounded-full bg-[#FFE5B4]/30 opacity-30 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative w-full max-w-md rounded-3xl border border-[#e5d6d3] bg-white/80 p-6 text-gray-800 shadow-xl transition-colors duration-500 sm:p-10 dark:border-[#A13333]/30 dark:bg-[#040303]/50 dark:text-gray-100">
        <h2 className="mb-6 text-center text-2xl font-semibold tracking-wide sm:mb-8 sm:text-3xl">
          Create Your Account
        </h2>

        {error && (
          <p className="mb-4 text-left text-xs text-red-500 sm:text-sm dark:text-[#A13333]">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={(e) =>
                setUsernameError(validateUsername(e.target.value))
              }
              required
              className={`rounded-xl border bg-white px-3 py-2.5 text-sm transition outline-none sm:px-4 sm:py-3 sm:text-base dark:bg-[#2a0f0f] ${
                usernameError
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-[#d9c2be] focus:border-transparent focus:ring-2 focus:ring-[#B3541E] dark:border-[#A13333]/40 dark:focus:ring-[#A13333]"
              } `}
            />
            {usernameError && (
              <p className="mt-1 text-xs text-red-500 sm:text-sm">
                {usernameError}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) =>
                setEmailError(validateEmail(e.target.value))
              }
              required
              className={`rounded-xl border bg-white px-3 py-2.5 text-sm transition outline-none sm:px-4 sm:py-3 sm:text-base dark:bg-[#2a0f0f] ${
                emailError
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-[#d9c2be] focus:border-transparent focus:ring-2 focus:ring-[#B3541E] dark:border-[#A13333]/40 dark:focus:ring-[#A13333]"
              } `}
            />
            {emailError && (
              <p className="mt-1 text-xs text-red-500 sm:text-sm">
                {emailError}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) =>
                  setPasswordError(validatePassword(e.target.value))
                }
                required
                className={`w-full rounded-xl border bg-white px-3 py-2.5 pr-10 text-sm transition outline-none sm:px-4 sm:py-3 sm:text-base dark:bg-[#2a0f0f] ${
                  passwordError
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-[#d9c2be] focus:border-transparent focus:ring-2 focus:ring-[#B3541E] dark:border-[#A13333]/40 dark:focus:ring-[#A13333]"
                }`}
              />
              {password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-gray-500 transition hover:text-[#A13333] md:text-sm dark:text-gray-400 dark:hover:text-[#B3541E]"
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
              )}
            </div>

            {passwordError && (
              <p className="mt-1 text-xs text-red-500 sm:text-sm">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              usernameError ||
              emailError ||
              passwordError ||
              !username ||
              !email ||
              !password
            }
            className={`mt-2 rounded-xl py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 sm:py-3 sm:text-base ${
              usernameError ||
              emailError ||
              passwordError ||
              !username ||
              !email ||
              !password
                ? "cursor-not-allowed bg-gray-400"
                : "bg-linear-to-r from-[#B3541E] to-[#A13333] hover:scale-[1.02] active:scale-[0.98] dark:from-[#A13333] dark:to-[#B3541E]"
            } `}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-600 sm:mt-6 sm:text-sm dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-[#A13333] transition hover:text-[#B3541E] dark:text-[#B3541E] dark:hover:text-[#A13333]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

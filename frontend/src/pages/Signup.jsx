import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { Link } from "react-router";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateUsername = (value) => {
    if (value.trim().length < 3)
      return "Username must be at least 3 characters";
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
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-left">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 text-gray-700 font-medium text-left"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={(e) => setUsernameError(validateUsername(e.target.value))}
              required
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                usernameError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {usernameError}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-gray-700 font-medium text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => setEmailError(validateEmail(e.target.value))}
              required
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {emailError}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-gray-700 font-medium text-left"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
              required
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                passwordError
                  ? "border-red-500 focus:ring-red-500 "
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 text left">
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
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
              usernameError ||
              emailError ||
              passwordError ||
              !username ||
              !email ||
              !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

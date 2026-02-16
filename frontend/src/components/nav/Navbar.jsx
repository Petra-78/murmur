import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header
      className="
               sticky top-0 z-50
  backdrop-blur-xl border-b
  px-6 py-4 flex items-center justify-between
  transition-colors duration-500

  bg-white/80 border-[#e5d6d3]
  dark:bg-[#040303] dark:border-[#461111]
  "
    >
      <div className="flex gap-2 items-center">
        <Link
          to="/"
          className="
      text-2xl md:text-2xl font-semibold tracking-wide transition

      text-[#A13333] hover:text-[#B3541E]
      dark:hover:text-[#B3541E] dark:text-[#A13333]
      "
        >
          Murmur
        </Link>
      </div>

      <div className="flex gap-4 md:gap-6 items-center">
        {user ? (
          <>
            <button
              className="
          flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-xl
          transition

          bg-[#f3ece7] text-gray-700 hover:bg-[#e9d8d3]
          dark:bg-[#461111]/60 dark:text-gray-200 dark:hover:bg-[#A13333]/30
          "
            >
              <span className="text-sm md:text-base">
                Hello, {user.username}
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="
          px-3 py-1 md:px-4 md:py-2 rounded-xl transition shadow-md

          bg-linear-to-r from-[#B3541E] to-[#A13333] text-white
          hover:scale-105 active:scale-95

          dark:from-[#A13333] dark:to-[#B3541E]
          "
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="
          px-4 py-2 rounded-xl font-medium transition

          bg-[#B3541E] text-white hover:bg-[#9f4719]

          dark:bg-[#A13333] dark:hover:bg-[#8c2a2a]
          "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
          px-4 py-2 rounded-xl font-medium transition

          border border-[#A13333] text-[#A13333]
          hover:bg-[#A13333] hover:text-white

          dark:border-[#B3541E] dark:text-[#B3541E]
          dark:hover:bg-[#B3541E] dark:hover:text-white
          "
            >
              Sign up
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}

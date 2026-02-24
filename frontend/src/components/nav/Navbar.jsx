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
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5d6d3] bg-white/80 px-6 py-4 backdrop-blur-xl transition-colors duration-500 dark:border-[#461111] dark:bg-[#040303]">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="text-md font-semibold tracking-wide text-[#A13333] transition hover:text-[#B3541E] md:text-2xl dark:text-[#A13333] dark:hover:text-[#B3541E]"
        >
          Murmur
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {user ? (
          <>
            <Link to={`/users/${user.username}`}>
              <button className="flex items-center gap-2 rounded-xl bg-[#f3ece7] px-3 py-1 text-gray-700 transition hover:bg-[#e9d8d3] md:px-4 md:py-2 dark:bg-[#461111]/60 dark:text-gray-200 dark:hover:bg-[#A13333]/30">
                <span className="text-[12px] md:text-base">
                  Hello, {user.username}
                </span>
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-linear-to-r from-[#B3541E] to-[#A13333] px-3 py-1 text-[12px] text-white shadow-md transition hover:scale-105 active:scale-95 md:px-4 md:py-2 md:text-sm dark:from-[#A13333] dark:to-[#B3541E]"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-xl bg-[#B3541E] p-2 font-medium text-white transition hover:bg-[#9f4719] md:px-4 md:py-2 dark:bg-[#A13333] dark:hover:bg-[#8c2a2a]"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-xl border border-[#A13333] p-2 font-medium text-[#A13333] transition hover:bg-[#A13333] hover:text-white md:px-4 md:py-2 dark:border-[#B3541E] dark:text-[#B3541E] dark:hover:bg-[#B3541E] dark:hover:text-white"
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

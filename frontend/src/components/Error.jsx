import { Link } from "react-router";

export default function Error() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-[#fdf8f6] via-[#f7e9e8] to-[#f3ece7] px-4 text-center transition-colors duration-500 dark:from-[#040303] dark:via-[#1a0a0a] dark:to-[#040303]">
      <div className="absolute top-12 -left-10 h-72 w-72 rounded-full bg-[#FADADD]/20 opacity-40 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#FFE5B4]/30 opacity-30 blur-3xl" />

      <div className="relative w-full max-w-lg rounded-3xl border border-[#e5d6d3] bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-colors duration-500 dark:border-[#A13333]/30 dark:bg-[#040303]/50 dark:text-gray-100">
        <h1 className="mb-4 text-5xl font-semibold tracking-wide text-[#A13333] dark:text-[#B3541E]">
          Uh oh...
        </h1>

        <h2 className="mb-8 text-base text-gray-700 sm:text-lg dark:text-gray-300">
          Something must have gone wrong :(
        </h2>

        <Link to="/">
          <button className="rounded-xl bg-linear-to-r from-[#B3541E] to-[#A13333] px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:text-base dark:from-[#A13333] dark:to-[#B3541E]">
            Return to homepage
          </button>
        </Link>
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[#e5d6d3] bg-[#fdf8f6] transition-colors duration-500 dark:border-[#461111] dark:bg-[#040303]">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 text-sm text-gray-600 transition-colors duration-500 dark:text-gray-400">
        <a
          href="https://github.com/Petra-78/murmur"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-all duration-300 hover:text-[#A13333] dark:hover:text-[#B3541E]"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
          <span>Petra-78</span>
        </a>
      </div>
    </footer>
  );
}

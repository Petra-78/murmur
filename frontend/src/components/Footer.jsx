import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer
      className="
    border-t transition-colors duration-500

    bg-[#fdf8f6] border-[#e5d6d3]
    dark:bg-[#040303] dark:border-[#461111]
    "
    >
      <div
        className="
      max-w-6xl mx-auto px-4 py-4
      flex items-center justify-center
      text-sm transition-colors duration-500

      text-gray-600
      dark:text-gray-400
      "
      >
        <a
          href="https://github.com/Petra-78/murmur"
          target="_blank"
          rel="noopener noreferrer"
          className="
        flex items-center gap-2 transition-all duration-300

        hover:text-[#A13333]
        dark:hover:text-[#B3541E]
        "
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
          <span>Petra-78</span>
        </a>
      </div>
    </footer>
  );
}

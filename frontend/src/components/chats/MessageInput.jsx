import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "./ImageUploader.jsx";

export default function MessageInput({
  content,
  setContent,
  onSubmit,
  handleTyping,
  onImageSelect,
  sending,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 rounded-full border border-[#e5d6d3] bg-white/80 px-3 py-2 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-[#A13333]/30 dark:bg-[#040303]/50"
    >
      <div className="flex items-center">
        <ImageUploader onSelect={onImageSelect} disabled={sending} />
      </div>

      <div className="flex-1">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          onKeyDown={handleTyping}
          className={`w-full rounded-full bg-transparent px-4 py-2 text-sm placeholder-gray-400 outline-none dark:text-white dark:placeholder-gray-500`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="flex items-center justify-center rounded-full bg-linear-to-r from-[#B3541E] to-[#A13333] p-2 text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 md:p-3 dark:from-[#A13333] dark:to-[#B3541E]"
      >
        {sending ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon icon={faPaperPlane} />
        )}
      </button>
    </form>
  );
}

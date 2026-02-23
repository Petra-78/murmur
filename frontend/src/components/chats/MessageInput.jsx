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
      className="flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2 shadow-sm"
    >
      <div className="flex items-center gap-1 pl-1">
        <ImageUploader onSelect={onImageSelect} disabled={sending} />
      </div>

      <div className="flex-1 px-1">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          onKeyDown={handleTyping}
          className={`w-full rounded-full border px-3 py-2 focus:outline-none ${
            sending
              ? "border-gray-400 bg-gray-100"
              : "border-gray-300 bg-white"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="md:text-md flex items-center justify-center rounded-full bg-blue-600 p-2 text-sm text-white transition hover:bg-blue-700 md:p-3"
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

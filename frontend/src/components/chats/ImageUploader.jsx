import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

export default function ImagePicker({ onSelect }) {
  const inputRef = useRef(null);

  if (inputRef.current) {
    inputRef.current.value = "";
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="relative cursor-pointer rounded-full pl-3 text-xl text-zinc-600 transition-colors duration-200 hover:text-[#A13333]"
        title="Upload image"
        aria-label="Upload image"
      >
        <FontAwesomeIcon icon={faImage} />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files[0]) {
            onSelect(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

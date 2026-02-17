import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <FontAwesomeIcon
        className="text-5xl text-[#A13333]"
        icon={faSpinner}
        spin={true}
      />
    </div>
  );
}

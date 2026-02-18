import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-100 dark:bg-zinc-900">
      <FontAwesomeIcon
        className="text-5xl text-[#A13333]"
        icon={faSpinner}
        spin={true}
      />
    </div>
  );
}

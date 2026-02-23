import ChatList from "../components/chats/ChatList";
import LeftSidebar from "../components/left-sidebar/LeftSidebar";
import RightSidebar from "../components/right-sidebar/RightSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function Messages() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-zinc-900">
      <div className="max-w-8xl grid w-full grid-cols-1 justify-center gap-6 px-4 py-4 lg:grid-cols-[minmax(170px,300px)_minmax(400px,850px)_350px]">
        <aside className="hidden lg:block">
          <div className="sticky bottom-0 rounded-xl bg-white p-4 shadow-sm md:top-23 dark:bg-zinc-950 dark:text-white">
            <LeftSidebar />
          </div>
        </aside>

        <aside className="fixed right-0 bottom-0 left-0 z-50 bg-white p-4 shadow lg:hidden dark:bg-zinc-950">
          <LeftSidebar />
        </aside>
        <div className="flex w-full flex-1 justify-center">
          <div className="flex w-full max-w-3xl flex-col items-center">
            <div className="w-full border-b border-[#A13333] bg-white/90 p-3 dark:bg-[#040303]/90">
              <button
                className="flex items-center gap-3 text-zinc-900 transition-colors duration-200 hover:text-[#A13333] dark:text-gray-300"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
              </button>
            </div>

            <ChatList />
          </div>
        </div>
        <aside className="hidden max-w-md lg:block">
          <div className="sticky top-23 rounded-2xl bg-white p-2 shadow-sm dark:bg-zinc-950">
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}

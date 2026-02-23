import LeftSidebar from "../components/left-sidebar/LeftSidebar";
import RightSidebar from "../components/right-sidebar/RightSidebar";
import ChatWindow from "../components/chats/ChatWindow";

export default function Chat() {
  return (
    <div className="flex h-[90vh] w-full justify-center overflow-hidden bg-gray-100 dark:bg-zinc-900">
      <div className="max-w-8xl mx-auto grid h-full grid-cols-1 justify-center gap-6 px-4 py-4 lg:grid-cols-[minmax(170px,300px)_minmax(400px,850px)_350px]">
        <aside className="hidden lg:block">
          <div className="rounded-xl bg-white p-4 shadow-sm md:top-23 dark:bg-zinc-950 dark:text-white">
            <LeftSidebar />
          </div>
        </aside>

        <aside className="fixed right-0 bottom-0 left-0 z-50 bg-white p-4 shadow lg:hidden dark:bg-zinc-950">
          <LeftSidebar />
        </aside>
        <div className="flex min-h-0 flex-1 flex-col">
          <ChatWindow />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-0 rounded-2xl bg-white p-2 shadow-sm dark:bg-zinc-950">
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}

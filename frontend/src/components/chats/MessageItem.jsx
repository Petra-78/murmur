export default function MessageItem({ message, currentUser }) {
  const isMine = message.user.id === currentUser.id;

  return (
    <div
      className={`flex gap-3 ${isMine ? "justify-end" : "justify-start"}`}
    >
      {!isMine && (
        <img
          src={message.user?.profileUrl || "/placeholder.jpeg"}
          alt={message.user?.username}
          className="mt-1 h-6 w-6 shrink-0 rounded-full border border-[#d9c2be] object-cover md:h-9 md:w-9 dark:border-[#A13333]/40"
        />
      )}

      <div
        className={`flex flex-col gap-1 ${
          isMine ? "items-end" : "items-start"
        }`}
      >
        {!isMine && (
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {message.user?.username}
          </span>
        )}

        {message.content && (
          <div
            className={`w-full max-w-50 rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed wrap-break-word shadow-sm transition-all duration-300 md:max-w-100 ${
              isMine
                ? `rounded-br-md bg-linear-to-r from-[#B3541E] to-[#A13333] text-white dark:from-[#A13333] dark:to-[#B3541E]`
                : `rounded-bl-md border border-[#e5d6d3] bg-white/80 text-gray-800 backdrop-blur-md dark:border-[#A13333]/30 dark:bg-[#2a0f0f] dark:text-gray-100`
            } `}
          >
            {message.content}
          </div>
        )}

        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt=""
            className="max-h-96 max-w-[85%] rounded-2xl border border-[#e5d6d3] object-cover md:max-w-[60%] dark:border-[#A13333]/30"
          />
        )}

        <span className="text-[10px] text-gray-500 dark:text-gray-500">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

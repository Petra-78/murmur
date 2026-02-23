export default function MessageItem({ message, currentUser }) {
  const isMine = message.user.id === currentUser.id;

  return (
    <div
      className={`flex gap-2 ${isMine ? "justify-end" : "justify-start"}`}
    >
      {!isMine && (
        <img
          src={message.user?.profileUrl || "/placeholder.jpeg"}
          alt={message.user?.username}
          className="mt-1 h-5 w-5 shrink-0 rounded-full object-cover md:h-8 md:w-8"
        />
      )}

      <div
        className={`flex flex-col gap-1 ${
          isMine ? "items-end" : "items-start"
        }`}
      >
        {!isMine && (
          <span className="text-xs font-medium text-gray-600">
            {message.user?.username}
          </span>
        )}

        {message.content && (
          <div
            className={`max-w-40 rounded-lg px-3 py-2 wrap-break-word whitespace-pre-wrap md:max-w-100 ${isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} `}
          >
            <p className="text-sm leading-relaxed">
              {message.content}
            </p>
          </div>
        )}

        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt=""
            className="max-h-100 max-w-[85%] rounded-lg object-cover sm:max-w-[60%]"
          />
        )}

        <span className="text-[8px] text-gray-500">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

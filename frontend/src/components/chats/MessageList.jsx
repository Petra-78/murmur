import MessageItem from "./MessageItem";
import DateDivider from "./DateDivider";

export default function MessageList({
  messages,
  currentUser,
  loading,
  endRef,
}) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="mb-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
      {messages.length === 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          No messages yet.
        </div>
      )}

      {messages.map((msg, i) => {
        const prev = messages[i - 1];
        const showDate =
          !prev ||
          new Date(prev.createdAt).toDateString() !==
            new Date(msg.createdAt).toDateString();

        return (
          <div key={msg.id}>
            {showDate && <DateDivider date={msg.createdAt} />}
            <MessageItem message={msg} currentUser={currentUser} />
          </div>
        );
      })}

      <div ref={endRef} />
    </div>
  );
}

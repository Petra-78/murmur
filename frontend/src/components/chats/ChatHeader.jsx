export default function ChatHeader({ user }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-4 border-b border-gray-300 pb-2">
      <>
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={user.avatarUrl || "/placeholder.png"}
          alt=""
        />
        <h2 className="text-lg font-semibold text-gray-800">
          {user.username}
        </h2>
      </>
    </div>
  );
}

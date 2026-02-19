export default function SendMessageButton() {
  return (
    <button
      onClick={(e) => (isFollowing ? unfollowUser(e) : followUser(e))}
      className={`min-w-30 rounded-full bg-[#B3541E] px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d67b46]`}
    >
      Send Message
    </button>
  );
}

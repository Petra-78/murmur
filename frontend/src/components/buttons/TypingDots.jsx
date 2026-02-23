export default function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]" />
    </div>
  );
}

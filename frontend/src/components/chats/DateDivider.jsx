export default function DateDivider({ date }) {
  const d = new Date(date);
  const now = new Date();

  let label =
    d.toDateString() === now.toDateString()
      ? "Today"
      : d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year:
            d.getFullYear() !== now.getFullYear()
              ? "numeric"
              : undefined,
        });

  return (
    <div className="my-2 text-center text-sm text-gray-400">
      {label}
    </div>
  );
}

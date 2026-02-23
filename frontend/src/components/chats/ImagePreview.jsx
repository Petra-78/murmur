export default function ImagePreview({ src, onRemove }) {
  return (
    <div className="mb-2 flex w-full items-start gap-2 sm:w-auto">
      <div className="relative w-auto shrink-0">
        <img
          src={src}
          className="max-h-20 w-auto rounded-lg object-cover"
          alt="preview"
        />
        <button
          onClick={onRemove}
          className="absolute top-1 -right-7 rounded-full bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}

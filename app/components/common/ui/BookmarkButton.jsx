export default function BookmarkButton({ isBookmarked = false, onToggle, className = "" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isBookmarked ? "Remove bookmark" : "Save job"}
      className={`p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${className}`}
    >
      <svg
        className={`w-5 h-5 ${isBookmarked ? "fill-blue-500 text-blue-500" : "fill-none"}`}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
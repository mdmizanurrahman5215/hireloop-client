export default function PreviewBlock({ title, value }) {
  if (!value?.trim()) {
    return null;
  }

  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-slate-900 dark:text-white">
        {title}
      </h4>

      <div className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-400">
        {value}
      </div>
    </div>
  );
}

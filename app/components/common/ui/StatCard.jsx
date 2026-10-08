export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5">
      {Icon && (
        <div className="p-2.5 rounded-lg bg-slate-800/80 text-blue-400 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-medium truncate">
          {label ?? "N/A"}
        </p>
        <p className="text-sm font-semibold text-slate-100 mt-0.5 truncate">
          {value ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
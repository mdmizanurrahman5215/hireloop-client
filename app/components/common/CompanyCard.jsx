import { Building2, CheckCircle2 } from "lucide-react";

function CompanyCard({ company }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Building2 size={26} />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                {company.name}
              </h3>

              {company.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <CheckCircle2 size={12} />
                  Verified
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your registered recruiter company
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 dark:border-blue-500/20 dark:bg-blue-500/10">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {company.plan} Plan
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            {company.activeJobs} / {company.jobLimit} active jobs
          </p>
        </div>
      </div>
    </div>
  );
}
export default CompanyCard;
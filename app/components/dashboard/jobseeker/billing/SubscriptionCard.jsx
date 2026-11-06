
import Link from "next/link";

const PLAN_FEATURES = [
  "Unlimited Applications",
  "Premium Job Insights",
  "Priority Candidate Badge",
  "Direct Recruiter Messaging",
];

export default function SubscriptionCard({ subscription }) {
  const amount = Number(subscription?.amount ?? 0);

  const currency = (
    subscription?.currency ?? "usd"
  ).toUpperCase();

  const interval = subscription?.interval ?? "monthly";

  const planName =
    subscription?.planId === "jobseeker-premium"
      ? "Premium Plan"
      : subscription?.planName ?? "Subscription Plan";

  const isActive = subscription?.status === "active";

  const formattedAmount = (() => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(amount);
    } catch (error) {
      console.error("Currency formatting error:", error);
      return `${currency} ${amount}`;
    }
  })();

  return (
    <section className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            Current Plan
          </span>

          <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
            {planName}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Unlock premium job insights and career opportunities.
          </p>

          <span
            className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
              isActive
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            }`}
          >
            {subscription?.status ?? "Unknown"}
          </span>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {formattedAmount}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            / {interval}
          </p>
        </div>

      </div>

      <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PLAN_FEATURES.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              ✓
            </span>

            <span className="text-sm text-slate-700 dark:text-slate-300">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/pricing"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          Upgrade Plan
        </Link>

        <Link
          href="/pricing"
          className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Manage Plan
        </Link>
      </div>

    </section>
  );
}

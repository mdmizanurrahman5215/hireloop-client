
import Link from "next/link";

export default function BillingSupport() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Need help with your invoice?
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Our support team is available to help with payment issues or billing details.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">

        <Link
          href="/contact"
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Contact Support
        </Link>

        <Link
          href="/terms"
          className="text-sm text-slate-500 underline underline-offset-4 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          Billing Policy
        </Link>

      </div>

    </section>
  );
}

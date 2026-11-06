
function formatDate(date) {
  if (!date) return "—";

  try {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "—";
  }
}

function StatusBadge({ status }) {
  const isPaid = status?.toLowerCase() === "paid";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        isPaid
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
      }`}
    >
      {status ?? "Unknown"}
    </span>
  );
}

export default function BillingHistory({
  billingHistory = [],
  subscription,
}) {
  const history = Array.isArray(billingHistory)
    ? billingHistory
    : [];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Billing History
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View your previous transactions and invoices.
          </p>
        </div>

        <button
          type="button"
          disabled={!history.length}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Export PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">

          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              {["Date", "Plan", "Amount", "Transaction ID", "Status"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {history.length > 0 ? (
              history.map((item) => (
                <tr key={item?._id}>
                  <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {formatDate(item?.createdAt ?? item?.startDate)}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {item?.planName ?? item?.planId ?? "—"}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    {item?.currency?.toUpperCase() ?? "USD"}{" "}
                    {Number(item?.amount ?? 0).toFixed(2)}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                    {item?.stripeInvoiceId ?? item?.transactionId ?? "—"}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={item?.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <p className="font-medium text-slate-700 dark:text-slate-200">
                    No billing history available
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Your transactions will appear here.
                  </p>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

    </section>
  );
}


export default function PaymentMethodCard({
  paymentMethod,
  stripeCustomerId,
}) {
  const hasPaymentMethod = Boolean(paymentMethod?.last4);

  return (
    <section className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Payment Method
        </h2>

        <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Secure Payment
        </span>
      </div>

      {hasPaymentMethod ? (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {paymentMethod?.brand ?? "Card"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {paymentMethod?.brand?.toUpperCase()}
            </span>
          </div>

          <p className="mt-5 text-lg font-medium tracking-widest text-slate-800 dark:text-slate-200">
            •••• •••• •••• {paymentMethod?.last4}
          </p>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Expires {paymentMethod?.expMonth ?? "--"}/
            {paymentMethod?.expYear ?? "--"}
          </p>

        </div>
      ) : (
        <div className="mt-5 flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-950">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 10h18M7 15h3" />
            </svg>
          </div>

          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Payment details securely stored
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage your payment information through Stripe.
          </p>

        </div>
      )}

      <button
        type="button"
        disabled={!stripeCustomerId}
        className="mt-5 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        title="Stripe customer portal integration required"
      >
        Manage Payment Method
      </button>

    </section>
  );
}

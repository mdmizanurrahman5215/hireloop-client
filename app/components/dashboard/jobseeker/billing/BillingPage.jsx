"use client";

import { useState } from "react";

import SubscriptionCard from "./SubscriptionCard";
import PaymentMethodCard from "./PaymentMethodCard";
import BillingHistory from "./BillingHistory";
import BillingSupport from "./BillingSupport";

export default function BillingPage({
  initialSubscription = null,
  initialBillingHistory = [],
  initialPaymentMethod = null,
  initialError = null,
  error = null,
}) {
  // Billing page states
  const [subscription] = useState(initialSubscription ?? null);

  const [billingHistory] = useState(
    Array.isArray(initialBillingHistory)
      ? initialBillingHistory
      : []
  );

  const [paymentMethod] = useState(
    initialPaymentMethod ?? null
  );

  const [pageError] = useState(error ?? initialError ?? null);

  // Error state
  if (pageError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 text-center dark:border-red-900/50 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10">
            <span className="text-xl">!</span>
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Unable to Load Billing Information
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {pageError}
          </p>
        </div>
      </main>
    );
  }

  // Empty subscription state
  if (!subscription?._id) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            No Subscription Found
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            You don't currently have any subscription information available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-200 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Subscription & Billing
          </h1>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your subscription, payment methods and billing history.
          </p>
        </div>

        {/* Subscription and Payment */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SubscriptionCard subscription={subscription} />
          </div>

          <div className="lg:col-span-2">
            <PaymentMethodCard paymentMethod={paymentMethod} />
          </div>
        </div>

        {/* Billing History */}
        <BillingHistory
          billingHistory={billingHistory}
          subscription={subscription}
        />

        {/* Support */}
        <BillingSupport />

      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { PRICING_PLANS, USER_TYPES } from "../../constants/pricing/plan";

function formatPrice(price) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

function PricingCard({ plan, userType, index }) {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const isYearly = billingCycle === "yearly";
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const Icon = plan.icon;

  const isFreePlan = plan.monthlyPrice === 0 && plan.yearlyPrice === 0;

  // Dynamically select the matching Stripe Price ID.
  const stripePriceId = plan.stripePriceIds?.[billingCycle] ?? null;

  // Paid plans require a configured Stripe Price ID.
  const isCheckoutReady = isFreePlan || Boolean(stripePriceId);

  const annualTotal = plan.yearlyPrice * 12;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`relative flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
        plan.popular
          ? "border-2 border-blue-500 bg-white shadow-xl shadow-blue-500/10 dark:bg-slate-900"
          : "border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Most Popular
        </span>
      )}

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {plan.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {userType === "jobseeker" ? "Career plan" : "Recruiter plan"}
          </p>
        </div>
      </div>

      <p className="mt-5 min-h-10 text-sm text-slate-600 dark:text-slate-400">
        {plan.subtitle}
      </p>

      {/* Monthly / Yearly billing toggle */}
      <div
        className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950"
        aria-label={`${plan.name} billing cycle`}
      >
        {["monthly", "yearly"].map((cycle) => {
          const active = billingCycle === cycle;

          return (
            <button
              key={cycle}
              type="button"
              onClick={() => setBillingCycle(cycle)}
              aria-pressed={active}
              className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-semibold capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {cycle}

              {cycle === "yearly" && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                  }`}
                >
                  -25%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic price */}
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          ${formatPrice(price)}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          /month
        </span>
      </div>

      {isYearly && price > 0 && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          ${formatPrice(annualTotal)} billed annually
        </p>
      )}

      {!isYearly && price > 0 && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Billed monthly
        </p>
      )}

      <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

      <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
        What's included
      </p>

      <ul className="mb-8 flex-1 space-y-4">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Check className="h-3 w-3" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Checkout form */}
      <form action="/api/checkout_sessions" method="POST" className="mt-auto">
        <input type="hidden" name="planId" value={plan.id} />
        <input type="hidden" name="userType" value={userType} />
        <input
          type="hidden"
          name="billingCycle"
          value={billingCycle}
        />

        {/* Empty for free plans; selected cycle ID for paid plans */}
        <input
          type="hidden"
          name="priceId"
          value={stripePriceId ?? ""}
        />

        <motion.button
          type="submit"
          disabled={!isCheckoutReady}
          whileHover={isCheckoutReady ? { scale: 1.02 } : undefined}
          whileTap={isCheckoutReady ? { scale: 0.98 } : undefined}
          className={`flex w-full items-center justify-between gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-slate-900 ${
            plan.popular
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          }`}
        >
          <span>
            {!isCheckoutReady
              ? "Stripe Setup Pending"
              : isFreePlan
                ? "Get Started"
                : "Choose Plan"}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </motion.button>
      </form>
    </motion.article>
  );
}

export default function PricingSection() {
  const [userType, setUserType] = useState("jobseeker");

  const plans = PRICING_PLANS?.[userType] ?? PRICING_PLANS.jobseeker;

  return (
    <section className="w-full bg-slate-50 px-4 py-20 text-slate-900 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <div className="mb-8 max-w-2xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            <span aria-hidden="true">▪</span>
            <span>Hireloop Pricing</span>
            <span aria-hidden="true">▪</span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Pay for the leverage, not the listings
          </h2>

          <p className="text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-400">
            Choose the plan that matches your goals and get more out of Hireloop.
          </p>
        </div>

        {/* Jobseeker / Recruiter toggle */}
        <div
          className="mb-12 inline-flex w-full max-w-sm items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          role="group"
          aria-label="Choose account type"
        >
          {USER_TYPES.map((type) => {
            const active = userType === type.id;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setUserType(type.id)}
                aria-pressed={active}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={userType}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid w-full max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={`${userType}-${plan.id}`}
              plan={plan}
              userType={userType}
              index={index}
            />
          ))}
        </motion.div>

        <p className="mt-8 max-w-xl text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
          Secure checkout powered by Stripe. The selected plan, billing cycle,
          and Price ID are submitted for server-side validation.
        </p>
      </div>
    </section>
  );
}

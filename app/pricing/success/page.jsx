import { redirect } from "next/navigation";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { stripe } from "../../lib/stripe";
import { createSubscription } from "../../lib/actions/subscriptionAction";
import { getServerUser } from "../../lib/server-session";


export default async function Success({ searchParams }) {
  const { session_id } = (await searchParams) || {};

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe?.checkout?.sessions?.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  console.log("Stripe Session:", session?.metadata);
  const status = session?.status;
  const customerEmail = session?.customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const user = await getServerUser();
    console.log("Server User:", user);

    if (user) {
      const planId = session?.metadata?.planId;
      const userType = session?.metadata?.userType;
      const billingCycle = session?.metadata?.billingCycle;

      try {
        const payload = {
          userId: user?._id || user?.id,
          email: customerEmail || user?.email,
          planId,
          userType,
          interval: billingCycle,
          stripeSubscriptionId: session?.subscription,
          stripeCustomerId: session?.customer,
          amount: session?.amount_total ? session.amount_total / 100 : 0,
          currency: session?.currency || "usd",
        };

        console.log("Preparing to sync subscription with payload:", payload);

        const result = await createSubscription(payload);
        console.log("Subscription sync result:", result);

      } catch (error) {
        console.error("Failed to sync subscription with backend:", error);
       
      }
    }
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-8 text-center border-b border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
              Payment Successful
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Thank you for your order!
            </h1>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-slate-600 dark:text-slate-400 text-center leading-relaxed text-sm sm:text-base">
              We appreciate your business!{" "}
              {customerEmail ? (
                <>
                  A confirmation email has been sent to{" "}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {customerEmail}
                  </span>
                  .
                </>
              ) : (
                <>A confirmation email has been sent to your inbox.</>
              )}
            </p>

            {/* Session Summary Card */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 text-sm border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">
                  Order Status
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                  {status || "Complete"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">
                  Reference ID
                </span>
                <span
                  className="font-mono text-xs text-slate-900 dark:text-slate-100 truncate max-w-[180px]"
                  title={session?.id}
                >
                  {session?.id || "N/A"}
                </span>
              </div>
            </div>

            {/* Support Notice */}
            <div className="text-xs text-slate-600 dark:text-slate-400 text-center pt-2">
              Need help with your order?{" "}
              <a
                href="mailto:orders@example.com"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors"
              >
                Contact Support
              </a>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-200 cursor-pointer"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return null;
}

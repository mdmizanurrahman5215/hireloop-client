"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ReceiptText,
  ShieldCheck,
  LoaderCircle,
  CircleAlert,
} from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    const verifyPayment = async () => {
      if (!sessionId) {
        if (isMounted) setStatus("missing");
        return;
      }

      try {
        // TODO: Verify the Checkout Session through your backend.
        // Never trust the success URL alone as proof of payment.
        const response = await fetch(
          `/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId)}`,
          { method: "GET", cache: "no-store" }
        );

        const result = await response.json().catch(() => null);

        if (!response.ok || result?.paymentStatus !== "paid") {
          if (isMounted) setStatus("pending");
          return;
        }

        if (isMounted) setStatus("success");
      } catch (error) {
        console.error("Payment verification failed:", error);

        if (isMounted) setStatus("error");
      }
    };

    verifyPayment();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const isSuccess = status === "success";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/50 sm:p-10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
      >
        {status === "loading" && (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
              <LoaderCircle className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold">Verifying your payment</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Please wait while we confirm your Stripe transaction.
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950"
            >
              <CheckCircle2 className="h-11 w-11 text-emerald-600 dark:text-emerald-400" />
            </motion.div>

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Payment confirmed
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight">
              Payment Successful!
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Thank you for choosing Hireloop. Your payment has been verified
              successfully.
            </p>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-start gap-3">
                <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Transaction verified</p>
                  <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">
                    Session ID: {sessionId || "Unavailable"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/recruiter"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
              Thank you for being part of Hireloop.
            </p>
          </>
        )}

        {(status === "missing" ||
          status === "pending" ||
          status === "error") && (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
              <CircleAlert className="h-10 w-10 text-amber-600 dark:text-amber-400" />
            </div>

            <h1 className="text-2xl font-bold">
              {status === "missing"
                ? "Session Not Found"
                : status === "pending"
                  ? "Payment Not Confirmed"
                  : "Something Went Wrong"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {status === "missing"
                ? "No Stripe checkout session was provided."
                : status === "pending"
                  ? "Your payment is not confirmed yet. If you completed checkout, please allow some time and check your payment status again."
                  : "We could not verify your payment because of a temporary error."}
            </p>

            <Link
              href="/dashboard/recruiter"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Return to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              If you were charged, please contact support before trying again.
            </p>
          </>
        )}
      </motion.section>
    </main>
  );
}
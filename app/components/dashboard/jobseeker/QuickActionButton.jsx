
"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function QuickActionButton() {
  return (
    <Link
      href="/dashboard/jobseeker/jobs"
      aria-label="Browse jobs"
      title="Browse Jobs"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-110 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
    >
      <Plus size={23} />
    </Link>
  );
}

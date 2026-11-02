
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  MapPin,
  Users,
  Globe,
} from "lucide-react";

export default function CompanyCard({ company, index = 0 }) {
  const id = company?._id?.toString?.() || company?.id || "";
  const name = company?.name || "Unnamed company";
  const logo = company?.logo || "";
  const category = company?.category || "Other";
  const location = company?.location || "Location not specified";
  const employeeCount = company?.employeeCount || "Not specified";
  const description =
    company?.description || "No company description available.";

  const isApproved =
    String(company?.status || "").toUpperCase() === "APPROVED";

  const website = company?.website || "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
      className="flex h-full min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-blue-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              loading="lazy"
              className="h-full w-full object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                event.currentTarget.nextElementSibling?.classList.remove(
                  "hidden"
                );
              }}
            />
          ) : null}

          <Building2
            aria-hidden="true"
            className={`h-6 w-6 text-slate-400 ${logo ? "hidden" : ""}`}
          />
        </div>

        {isApproved && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 size={12} />
            Approved
          </span>
        )}
      </div>

      <h2 className="mt-4 truncate text-sm font-semibold text-slate-900 dark:text-white">
        {name}
      </h2>

      <p className="mt-2 line-clamp-3 min-h-[60px] whitespace-pre-line text-xs leading-5 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
          {category}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
          <MapPin size={11} />
          {location}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Users size={14} />
        <span>{employeeCount}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-0 items-center gap-1 truncate text-xs text-slate-600 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <Globe size={13} />
            Website
          </a>
        ) : (
          <span className="text-xs text-slate-500">No website</span>
        )}

        <Link
          href={id ? `/companies/${encodeURIComponent(id)}` : "/companies"}
          aria-label={`View ${name} company profile`}
          className="inline-flex shrink-0 items-center gap-1 rounded-md text-xs font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Company
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

"use client"
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

export default function JobCard({ job, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-[#0e1219] border border-gray-800/80 hover:border-gray-700 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg"
    >
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
          {job.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed font-normal">
          {job.description}
        </p>

        {/* Badges List */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {/* Location Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#151b26] text-[11px] text-gray-300 font-medium">
            <MapPin className="w-3 h-3 text-purple-400" />
            {job.location}
          </span>

          {/* Type Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#151b26] text-[11px] text-gray-300 font-medium">
            <Briefcase className="w-3 h-3 text-purple-400" />
            {job.type}
          </span>
        </div>

        {/* Salary Badge */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#151b26] text-[11px] text-gray-300 font-medium">
            <DollarSign className="w-3 h-3 text-purple-400" />
            {job.salary}
          </span>
        </div>
      </div>

      {/* Apply Link Action */}
      <div className="pt-6">
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-200 hover:text-indigo-400 transition-colors"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
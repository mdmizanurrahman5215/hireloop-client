'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="relative w-full bg-[#05070B] text-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-indigo-600/25 blur-[140px] rounded-full pointer-events-none" />

      {/* Curved Perspective Radar Wireframe Pattern */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none opacity-40">
        <svg
          className="w-[900px] sm:w-[1300px] md:w-[1600px] h-[500px] sm:h-[700px] stroke-indigo-500/30"
          viewBox="0 0 1000 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric Ellipses / Radar Arcs */}
          <ellipse cx="500" cy="0" rx="200" ry="100" strokeWidth="1" />
          <ellipse cx="500" cy="0" rx="320" ry="160" strokeWidth="1" />
          <ellipse cx="500" cy="0" rx="440" ry="220" strokeWidth="1" />
          <ellipse cx="500" cy="0" rx="560" ry="280" strokeWidth="1" />
          <ellipse cx="500" cy="0" rx="680" ry="340" strokeWidth="1" />
          <ellipse cx="500" cy="0" rx="800" ry="400" strokeWidth="1" />
          <ellipse cx="500" cy="0" rx="920" ry="460" strokeWidth="1" />

          {/* Perspective Radial Lines Spreading Outward */}
          {Array.from({ length: 37 }).map((_, i) => {
            const angle = (i * 5 - 90) * (Math.PI / 180);
            const x2 = 500 + 1000 * Math.cos(angle);
            const y2 = 1000 * Math.sin(angle);
            return (
              <line
                key={i}
                x1="500"
                y1="0"
                x2={x2}
                y2={y2}
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>

      {/* Main CTA Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-5 leading-tight sm:leading-none"
        >
          Your next role is <br className="hidden sm:block" />
          already looking for you
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl font-medium mb-10 leading-relaxed"
        >
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          {/* Primary Action Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all shadow-xl shadow-white/10"
            >
              Create a free account
            </Link>
          </motion.div>

          {/* Secondary Action Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-6 py-3 bg-[#111520]/80 hover:bg-[#181f2f] border border-gray-800 text-gray-300 hover:text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all backdrop-blur-md"
            >
              View pricing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
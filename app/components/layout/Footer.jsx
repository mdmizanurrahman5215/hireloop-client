'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Custom Social Media SVG Components
const FacebookIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const PinterestIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// Footer Navigation Links Configuration
const FOOTER_SECTIONS = [
  {
    title: 'Product',
    links: [
      { name: 'Job discovery', href: '/jobs' },
      { name: 'Worker AI', href: '/worker-ai' },
      { name: 'Companies', href: '/companies' },
      { name: 'Salary data', href: '/salary-data' },
    ],
  },
  {
    title: 'Navigations',
    links: [
      { name: 'Help center', href: '/help' },
      { name: 'Career library', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Brand Guideline', href: '/brand-guidelines' },
      { name: 'Newsroom', href: '/newsroom' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 border-t transition-colors duration-300 bg-gray-100 dark:bg-[#05070B] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          {/* Brand & Description (Left Column) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Image
                  src="/images/logo.png"
                  alt="HireLoop Logo"
                  width={140}
                  height={40}
                  priority
                  className="object-contain w-auto h-8 sm:h-9"
                />
              </motion.div>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Links Columns (Right Columns) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Media Buttons */}
          <div className="flex items-center space-x-3">
            {/* Facebook */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-gray-200 dark:bg-gray-900/80 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <FacebookIcon size={18} />
            </motion.a>

            {/* Pinterest (Highlighted Button) */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
            >
              <PinterestIcon size={18} />
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-gray-200 dark:bg-gray-900/80 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <LinkedinIcon size={18} />
            </motion.a>
          </div>

          {/* Copyright & Policy Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-500 dark:text-gray-400 text-center sm:text-right">
            <span>Copyright 2024 — Programming Hero</span>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/terms-and-policy"
              className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              Terms & Policy - Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
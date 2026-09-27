'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  User,
  LogOut,
  ChevronDown,
  Briefcase,
  Settings,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { authClient } from '../../lib/auth-client';

// Navigation Links Configuration Array
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Browse Jobs', href: '/jobs' },
  { name: 'Companies', href: '/companies' },
  { name: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth Session Hook
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const profileRef = useRef(null);

  // Toggle Theme Function
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Logout
  const handleSignOut = async () => {
    const toastId = toast.loading('Signing out...');
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged out successfully!', { id: toastId });
            setIsProfileMenuOpen(false);
            setIsMobileMenuOpen(false);
            router.push('/signin');
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message || 'Failed to sign out', { id: toastId });
          },
        },
      });
    } catch (err) {
      toast.error('An error occurred while signing out', { id: toastId });
    }
  };

  // Helper to get first letter capitalized
  const getInitial = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-colors duration-300 px-4 py-4 md:px-8 ${
        isDarkMode ? 'bg-[#0B0F17]' : 'bg-gray-50'
      }`}
    >
      {/* Floating Container */}
      <div
        className={`max-w-7xl mx-auto backdrop-blur-xl border rounded-2xl px-6 py-3.5 flex items-center justify-between transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#111827]/80 border-gray-800/80 shadow-2xl shadow-black/40'
            : 'bg-white/80 border-gray-200/80 shadow-lg shadow-gray-200/50'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center justify-center"
          >
            <Image
              src="/images/logo.png"
              alt="HireLoop Logo"
              width={130}
              height={36}
              priority
              className="object-contain w-auto h-8 md:h-9"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? isDarkMode
                      ? 'text-white'
                      : 'text-indigo-600'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2.5 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700/80 text-amber-400 hover:bg-gray-700'
                : 'bg-gray-100 border-gray-200 text-indigo-600 hover:bg-gray-200'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <div className={`h-5 w-[1px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

          {/* User Auth Condition */}
          {isPending ? (
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          ) : user ? (
            /* Logged In State: Profile Dropdown */
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border transition-all ${
                  isDarkMode
                    ? 'bg-gray-800/60 border-gray-700/80 hover:bg-gray-800 text-white'
                    : 'bg-gray-100/80 border-gray-200 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {/* Avatar / Fallback Initial */}
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User Avatar'}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-600/30">
                    {getInitial(user.name)}
                  </div>
                )}

                <span className="text-sm font-semibold truncate max-w-[120px]">
                  {user.name || 'User'}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-64 rounded-2xl border p-2 shadow-2xl z-50 ${
                      isDarkMode
                        ? 'bg-[#111827] border-gray-800 text-gray-200'
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}
                  >
                    {/* User Info Header */}
                    <div className="p-3 border-b border-gray-200/50 dark:border-gray-800/80 mb-1">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                      {user.role && (
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-500 rounded-md">
                          {user.role}
                        </span>
                      )}
                    </div>

                    {/* Menu Options */}
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
                    >
                      <Briefcase size={16} className="text-indigo-500" />
                      Dashboard
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
                    >
                      <User size={16} className="text-indigo-500" />
                      Profile Settings
                    </Link>

                    <div className="my-1 border-t border-gray-200/50 dark:border-gray-800/80" />

                    {/* Logout Button */}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Logged Out State: Auth Actions */
            <>
              <Link
                href="/signin"
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-xl ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Sign In
              </Link>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/25"
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggles */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-amber-400'
                : 'bg-gray-100 border-gray-200 text-indigo-600'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className={`p-2 rounded-xl focus:outline-none ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden max-w-7xl mx-auto mt-2 border rounded-2xl p-5 flex flex-col space-y-3 text-sm transition-all ${
              isDarkMode
                ? 'bg-[#111827] border-gray-800 text-gray-300 shadow-2xl'
                : 'bg-white border-gray-200 text-gray-700 shadow-xl'
            }`}
          >
            {/* User Details Header in Mobile Menu (If logged in) */}
            {user && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 mb-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User Avatar'}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-base">
                    {getInitial(user.name)}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="font-bold text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav Links */}
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl transition-all font-medium ${
                    isActive
                      ? isDarkMode
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'bg-indigo-50 text-indigo-600'
                      : isDarkMode
                      ? 'hover:bg-gray-800/50 hover:text-white'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <hr className={isDarkMode ? 'border-gray-800 my-1' : 'border-gray-200 my-1'} />

            {/* Mobile Auth Actions */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl font-medium transition-colors ${
                    isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl font-medium transition-colors ${
                    isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 rounded-xl font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-center font-medium py-2 rounded-xl transition-colors ${
                    isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-center font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
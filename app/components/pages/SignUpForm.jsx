'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Upload,
  ArrowRight,
  Briefcase,
  UserCheck,
} from 'lucide-react';
import { authClient } from '../../lib/auth-client';


export default function SignUpForm() {
  const router = useRouter();

  // Form State
  const [role, setRole] = useState('jobseeker'); // 'jobseeker' | 'employer'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    linkedin: '',
  });

  // UI & File States
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Convert uploaded image file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    //   if (file.size > 2 * 1024 * 1024) {
    //     toast.error('Image size must be less than 2MB');
    //     setErrors((prev) => ({ ...prev, image: 'Max size 2MB' }));
    //     return;
    //   }

      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: '' }));
      toast.success('Image attached successfully!');

      // Convert file to Base64 String for Better Auth
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the form errors before submitting.');
      return false;
    }

    return true;
  };

  // Email & Password Signup using Better Auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const toastId = toast.loading('Creating your account...');

    try {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          image: imageBase64 || undefined,
          role: role,
          linkedin: formData.linkedin || undefined,
          website: formData.website || undefined,
          callbackURL: role === 'employer' ? '/dashboard/employer' : '/jobs',
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            toast.success('Account created successfully! Welcome to Hireloop 🎉', { id: toastId });
            router.push('/login');
          },
          onError: (ctx) => {
            setIsLoading(false);
            const errorMsg = ctx.error?.message || 'Failed to sign up. Please try again.';
            toast.error(errorMsg, { id: toastId });
          },
        }
      );
    } catch (err) {
      setIsLoading(false);
      toast.error('An unexpected error occurred. Please try again.', { id: toastId });
    }
  };

  // Google Social Sign-In using Better Auth
  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    const toastId = toast.loading('Connecting to Google...');

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: role === 'employer' ? '/dashboard/employer' : '/jobs',
        errorCallbackURL: '/signup',
      });
    } catch (err) {
      setIsGoogleLoading(false);
      toast.error('Google Sign-In failed. Please try again.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B0F17] transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-block mb-2">
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              Hire<span className="text-indigo-600 dark:text-indigo-400">loop</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Join thousands of job seekers and hiring teams on Hireloop.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 mb-8 bg-gray-100 dark:bg-gray-800/60 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
          <button
            type="button"
            onClick={() => {
              setRole('jobseeker');
              toast('Switched to Candidate Signup', { icon: '👤' });
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
              role === 'jobseeker'
                ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <UserCheck size={16} />
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('employer');
              toast('Switched to Employer Signup', { icon: '💼' });
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
              role === 'employer'
                ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Briefcase size={16} />
            Employer / Recruiter
          </button>
        </div>

        {/* Google OAuth Login */}
        <div className="mb-6">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors shadow-sm disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </motion.button>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <span className="relative px-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-white dark:bg-[#111827]">
            or register with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 group-hover:border-indigo-500 dark:group-hover:border-indigo-400 flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile Preview"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    <Upload size={22} />
                    <span className="text-[10px] font-medium mt-1">Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {errors.image && (
              <p className="text-xs text-rose-500 font-medium">{errors.image}</p>
            )}
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Upload {role === 'employer' ? 'Company Logo' : 'Profile Picture'} (Max 2MB)
            </span>
          </div>

          {/* Full Name / Company Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              {role === 'employer' ? 'Company Name *' : 'Full Name *'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={role === 'employer' ? 'Acme Inc.' : 'John Doe'}
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
            <span className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Social Links (Optional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
                  </svg>
                </div>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn Profile URL"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Globe size={16} />
                </div>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder={role === 'employer' ? 'Company Website' : 'Portfolio URL'}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Create {role === 'employer' ? 'Employer' : 'Candidate'} Account
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* Signin Redirect */}
        <div className="mt-8 text-center text-xs text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign in here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
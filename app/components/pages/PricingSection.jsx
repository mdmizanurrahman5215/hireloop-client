'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Crown, TrendingUp, Zap } from 'lucide-react';

const PRICING_PLANS = [
  { id: 'starter', name: 'Starter', icon: Crown, monthlyPrice: 0, yearlyPrice: 0, popular: false, subtitle: 'Start building your insights hub:', features: ['Daily AI match brief (top 5)', 'Verified salary bands', 'Company insight dashboards', '1-click apply, unlimited'] },
  { id: 'growth', name: 'Growth', icon: TrendingUp, monthlyPrice: 17, yearlyPrice: 12.75, popular: true, subtitle: 'Start building your insights hub:', features: ['Daily AI match brief (top 5)', 'Verified salary bands', 'Company insight dashboards', '1-click apply, unlimited'] },
  { id: 'premium', name: 'Premium', icon: Zap, monthlyPrice: 99, yearlyPrice: 74.25, popular: false, subtitle: 'Start building your insights hub:', features: ['Everything in Pro', 'Multi-profile career portfolios', 'Shared talent rooms', 'Recruiter view (read-only)'] },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full bg-slate-50 dark:bg-[#05070B] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            <span>▪</span>
            <span>PRICING</span>
            <span>▪</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-xl mx-auto leading-tight">
            Pay for the leverage, not the listings
          </h2>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-[#0e1219] border border-slate-200 dark:border-gray-800 rounded-full mb-14 shadow-sm">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              !isYearly ? 'bg-slate-900 dark:bg-white text-white dark:text-gray-900 shadow-md' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              isYearly ? 'bg-slate-900 dark:bg-white text-white dark:text-gray-900 shadow-md' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Yearly</span>
            <span className="px-2 py-0.5 text-[10px] bg-pink-600 text-white font-bold rounded-full">25%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {PRICING_PLANS.map((plan, index) => {
            const IconComponent = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'bg-white dark:bg-[#0f141f] border-2 border-indigo-500 dark:border-gray-700/80 shadow-xl dark:shadow-2xl'
                    : 'bg-white dark:bg-[#0a0d14] border border-slate-200 dark:border-gray-800/80 shadow-sm dark:shadow-none'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-gray-800/80 flex items-center justify-center text-pink-600 dark:text-pink-400">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">{plan.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        ${price === 0 ? '0' : price % 1 === 0 ? price : price.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">/month</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 dark:text-gray-300 mb-5">{plan.subtitle}</p>

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-xs text-slate-600 dark:text-gray-400">
                        <div className="w-4 h-4 rounded bg-slate-100 dark:bg-gray-800/80 flex items-center justify-center text-slate-500 dark:text-gray-400 shrink-0">
                          <Plus className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    plan.popular
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-gray-900 hover:bg-slate-800 dark:hover:bg-gray-100 shadow-md'
                      : 'bg-slate-100 dark:bg-[#161a23] text-slate-800 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-[#1d222e]'
                  }`}
                >
                  <span>Choose This Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
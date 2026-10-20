
import { Crown, TrendingUp, Zap } from "lucide-react";

export const PRICING_PLANS = {
  jobseeker: [
    {
      id: "jobseeker-starter",
      name: "Starter",
      icon: Crown,
      monthlyPrice: 0,
      yearlyPrice: 0,
      stripePriceIds: {
        monthly: null,
        yearly: null,
      },
      popular: false,
      subtitle: "Start building your career.",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
    },
    {
      id: "jobseeker-growth",
      name: "Growth",
      icon: TrendingUp,
      monthlyPrice: 17,
      yearlyPrice: 12.75,
      stripePriceIds: {
        monthly: "price_1URW3vFSBYA3xCSve64IR3yi", // Add monthly Stripe price_... ID
        yearly: "price_1URW5iFSBYA3xCSvsq7Yw6Po",  // Add yearly Stripe price_... ID
      },
      popular: true,
      subtitle: "Accelerate your job search.",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
    },
    {
      id: "jobseeker-premium",
      name: "Premium",
      icon: Zap,
      monthlyPrice: 99,
      yearlyPrice: 74.25,
      stripePriceIds: {
        monthly: "price_1URW4aFSBYA3xCSvRcSeiRpk",
        yearly: "price_1URW5iFSBYA3xCSvsq7Yw6Po",
      },
      popular: false,
      subtitle: "Unlock advanced career tools.",
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
    },
  ],

  recruiter: [
    {
      id: "recruiter-starter",
      name: "Starter",
      icon: Crown,
      monthlyPrice: 0,
      yearlyPrice: 0,
      stripePriceIds: {
        monthly: null,
        yearly: null,
      },
      popular: false,
      subtitle: "Start hiring with Hireloop.",
      features: [
        "Up to 3 job posts",
        "Manage job listings",
        "View applications",
        "Basic company profile",
      ],
    },
    {
      id: "recruiter-growth",
      name: "Growth",
      icon: TrendingUp,
      monthlyPrice: 17,
      yearlyPrice: 12.75,
      stripePriceIds: {
        monthly: "price_1URW7DFSBYA3xCSvzm7DKogF",
        yearly: "price_1URW7lFSBYA3xCSva7XJTVcL",
      },
      popular: true,
      subtitle: "Grow your hiring pipeline.",
      features: [
        "Up to 10 job posts",
        "Manage candidate applications",
        "Company profile management",
        "Advanced hiring workflow",
      ],
    },
    {
      id: "recruiter-enterprise",
      name: "Enterprise",
      icon: Zap,
      monthlyPrice: 99,
      yearlyPrice: 74.25,
      stripePriceIds: {
        monthly: "price_1US1WjFSBYA3xCSvbfOyYOOP",
        yearly: "price_1URW8dFSBYA3xCSvTTMSdn1a",
      },
      popular: false,
      subtitle: "Scale your recruitment.",
      features: [
        "Up to 50 job posts",
        "Advanced candidate management",
        "Multiple hiring workflows",
        "Enterprise hiring tools",
      ],
    },
  ],
};

export const USER_TYPES = [
  { id: "jobseeker", label: "Jobseeker" },
  { id: "recruiter", label: "Recruiter" },
];

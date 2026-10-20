const PLAN_LIMITS = {
  jobseeker: {
    starter: {
      maxApplications: 3,
    },
    growth: {
      maxApplications: 10,
    },
    premium: {
      maxApplications: Infinity,
    },
  },

  recruiter: {
    starter: {
      maxActiveJobs: 3,
    },
    growth: {
      maxActiveJobs: 10,
    },
    enterprise: {
      maxActiveJobs: Infinity,
    },
  },
};

function getDefaultPlan(role) {
  if (!["jobseeker", "recruiter"].includes(role)) {
    throw new Error("Invalid user role");
  }

  return {
    planId: "starter",
    billingInterval: null,
    subscriptionStatus: "free",
  };
}

function getPlanLimit(role, planId) {
  const plan = PLAN_LIMITS[role]?.[planId];

  if (!plan) {
    throw new Error("Invalid plan for this user role");
  }

  return role === "jobseeker"
    ? plan.maxApplications
    : plan.maxActiveJobs;
}

module.exports = {
  PLAN_LIMITS,
  getDefaultPlan,
  getPlanLimit,
};
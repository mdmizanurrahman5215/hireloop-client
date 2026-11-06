import BillingPage from "@/app/components/dashboard/jobseeker/billing/BillingPage";
import { getServerUser } from "../../../lib/server-session";
import { getSubscriptionByUser } from "../../../lib/actions/subscriptionAction";

export default async function Page() {
  const user = await getServerUser();

  if (!user?.id) {
    return (
      <BillingPage
        error="Please sign in to view your billing information."
      />
    );
  }

  const response = await getSubscriptionByUser(user.id);

  console.log("Subscription response:", response);

  if (!response?.success) {
    return (
      <BillingPage
        initialError={
          response?.error || "Failed to retrieve subscription."
        }
      />
    );
  }

  // Extract subscription data from API response
  const subscription = response?.data?.subscription ?? null;

  return (
    <BillingPage
      initialSubscription={subscription}
      initialBillingHistory={[]}
      initialPaymentMethod={null}
      initialError={null}
    />
  );
}
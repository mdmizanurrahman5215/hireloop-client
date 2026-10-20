
// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { stripe } from '../../lib/stripe';

// // import { stripe } from '../../../lib/stripe'

// export async function POST() {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: 'price_1URR1pFSBYA3xCSvcCEW4yuv',
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
//       // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
//       // integration_identifier: '{{INTEGRATION_ID}}',
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../lib/stripe";
import { PRICING_PLANS } from "../../constants/pricing/plan";
import { getServerUser } from "../../lib/server-session";
// import { PRICING_PLANS } from "../../../constants/pricing/plan";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin =
      headersList.get("origin") || new URL(request.url).origin;

    // Read the selected plan and billing cycle from the pricing form.
    const formData = await request.formData();

    const planId = formData.get("planId");
    const userType = formData.get("userType");
    const billingCycle = formData.get("billingCycle");
    const user = await getServerUser()

    // Validate the submitted values.
    if (
      typeof planId !== "string" ||
      typeof userType !== "string" ||
      typeof billingCycle !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid checkout parameters." },
        { status: 400 }
      );
    }

    if (!["jobseeker", "recruiter"].includes(userType)) {
      return NextResponse.json(
        { error: "Invalid user type." },
        { status: 400 }
      );
    }

    if (!["monthly", "yearly"].includes(billingCycle)) {
      return NextResponse.json(
        { error: "Invalid billing cycle." },
        { status: 400 }
      );
    }

    // Find the selected plan in the trusted server-side configuration.
    const plans = PRICING_PLANS[userType];
    const plan = plans?.find((item) => item.id === planId);

    if (!plan) {
      return NextResponse.json(
        { error: "The selected pricing plan was not found." },
        { status: 404 }
      );
    }

    // Free plans should not create Stripe Checkout subscriptions.
    const isFreePlan =
      plan.monthlyPrice === 0 && plan.yearlyPrice === 0;

    if (isFreePlan) {
      return NextResponse.redirect(
        new URL("/pricing?message=free-plan", origin),
        303
      );
    }

    // Always use the Price ID from server-side configuration.
    const priceId = plan.stripePriceIds?.[billingCycle];

    if (!priceId) {
      return NextResponse.json(
        {
          error: `Stripe Price ID is not configured for ${plan.name} (${billingCycle}).`,
        },
        { status: 400 }
      );
    }

    // Create a Stripe subscription Checkout Session.
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user?.email || undefined,

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      metadata: {
        planId: plan.id,
        userType,
        billingCycle,
      },

      subscription_data: {
        metadata: {
          planId: plan.id,
          userType,
          billingCycle,
        },
      },

      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
    });

    // Redirect the customer to Stripe Checkout.
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return NextResponse.json(
      { error: "Unable to create a checkout session." },
      { status: 500 }
    );
  }
}

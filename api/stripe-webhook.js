import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { buffer } from "micro"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const sig = req.headers["stripe-signature"]

    let event

    try {

        const rawBody = await buffer(req)

        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )

    } catch (err) {

        return res.status(400).send(
            `Webhook Error: ${err.message}`
        )

    }

    try {

        switch (event.type) {

            // 💳 PAYMENT SUCCESS
            case "checkout.session.completed": {

                const session = event.data.object

                const userId = session.metadata.userId

                await supabase
                    .from("subscriptions")
                    .upsert({
                        user_id: userId,
                        status: "active",
                        plan: "premium",
                        stripe_customer: session.customer,
                        stripe_subscription: session.subscription,
                        updated_at: new Date(),
                    })

                break
            }

            // ❌ SUBSCRIPTION CANCELED
            case "customer.subscription.deleted": {

                const subscription = event.data.object

                await supabase
                    .from("subscriptions")
                    .update({
                        status: "canceled",
                        plan: "free",
                        updated_at: new Date(),
                    })
                    .eq(
                        "stripe_subscription",
                        subscription.id
                    )

                break
            }

            // 🔁 SUBSCRIPTION UPDATED
            case "customer.subscription.updated": {

                const subscription = event.data.object

                const status = subscription.status

                await supabase
                    .from("subscriptions")
                    .update({
                        status,
                        plan:
                            status === "active"
                                ? "premium"
                                : "free",
                        current_period_end:
                            new Date(
                                subscription.current_period_end *
                                    1000
                            ),
                        updated_at: new Date(),
                    })
                    .eq(
                        "stripe_subscription",
                        subscription.id
                    )

                break
            }

            default:
                console.log(
                    `Unhandled event type: ${event.type}`
                )

        }

        res.json({ received: true })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            error: "Webhook handler failed",
        })

    }
}
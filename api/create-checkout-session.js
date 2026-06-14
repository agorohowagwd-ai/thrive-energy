import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {

        const { userId, email } = req.body

        const session = await stripe.checkout.sessions.create({

            mode: "subscription",

            payment_method_types: ["card"],

            customer_email: email,

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Thrive Pro",
                        },
                        unit_amount: 900, // $9.00
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                userId,
            },

            success_url: `${process.env.NEXT_PUBLIC_URL}/?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/?canceled=true`,
        })

        res.status(200).json({ url: session.url })

    } catch (error) {

        res.status(500).json({ error: error.message })

    }
}
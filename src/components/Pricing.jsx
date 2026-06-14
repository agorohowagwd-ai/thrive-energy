import { useBilling } from "../contexts/BillingContext"

export default function Pricing() {

    const { createCheckout } = useBilling()

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FBFAF8]">

            <div className="grid md:grid-cols-2 gap-10">

                {/* FREE */}
                <div className="p-10 border rounded-3xl bg-white">

                    <h2 className="text-2xl font-semibold">Free</h2>

                    <p className="text-black/50 mt-2">
                        Basic energy tracking
                    </p>

                    <div className="text-4xl font-semibold mt-6">
                        $0
                    </div>

                    <ul className="mt-6 space-y-2 text-black/60">
                        <li>✔ Track entries</li>
                        <li>✔ Basic dashboard</li>
                        <li>✔ History view</li>
                    </ul>

                </div>

                {/* PRO */}
                <div className="p-10 border rounded-3xl bg-red-900 text-white">

                    <h2 className="text-2xl font-semibold">Pro</h2>

                    <p className="text-white/70 mt-2">
                        AI insights + predictions
                    </p>

                    <div className="text-4xl font-semibold mt-6">
                        $9 / month
                    </div>

                    <ul className="mt-6 space-y-2 text-white/80">
                        <li>✔ Everything in Free</li>
                        <li>✔ AI insights</li>
                        <li>✔ Productivity analysis</li>
                        <li>✔ Premium support</li>
                    </ul>

                    <button
                        onClick={createCheckout}
                        className="mt-6 w-full py-3 bg-white text-red-900 rounded-xl font-semibold"
                    >
                        Upgrade Now
                    </button>

                </div>

            </div>

        </div>
    )
}
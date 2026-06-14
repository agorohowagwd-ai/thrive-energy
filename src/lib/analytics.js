import posthog from "posthog-js"

posthog.init("PH_KEY", {
    api_host: "https://app.posthog.com",
})

export default posthog
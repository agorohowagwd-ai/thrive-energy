import { useEffect, useState } from "react"

export default function SafeApp({ children }) {

    const [hasError, setHasError] = useState(false)

    useEffect(() => {

        const handler = () => setHasError(true)

        window.addEventListener("error", handler)

        return () =>
            window.removeEventListener("error", handler)

    }, [])

    if (hasError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">
                        Something went wrong
                    </h1>
                    <p className="text-black/50 mt-2">
                        Please refresh the page
                    </p>
                </div>
            </div>
        )
    }

    return children
}
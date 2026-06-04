import Background from "./Background"

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <Background />

      <div className="text-center">

        <h1 className="text-7xl font-semibold text-gray-900 mb-6">
          Energy Journal
        </h1>

        <p className="text-xl text-gray-500 mb-10">
          Discover what truly gives you energy.
        </p>

        <button
          onClick={onStart}
          className="
          px-10
          py-4
          rounded-2xl
          bg-orange-400
          hover:bg-orange-500
          text-white
          font-medium
          transition
          "
        >
          Start Free Trial
        </button>

      </div>

    </div>
  )
}
import Background from "./Background"

export default function Auth({
  mode,
  setMode,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  signIn,
  signUp,
  loading,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <Background />

      <div
        className="
        w-[420px]
        bg-white
        rounded-[32px]
        p-10
        shadow-xl
        border
        border-gray-100
        "
      >

        {mode === "login" && (
          <>
            <h2 className="text-3xl font-semibold mb-6">
              Welcome back
            </h2>

            <input
              className="w-full p-4 mb-3 border rounded-2xl"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full p-4 mb-4 border rounded-2xl"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              onClick={signIn}
              className="
              w-full
              bg-orange-400
              text-white
              p-4
              rounded-2xl
              "
            >
              Sign In
            </button>

            <button
              onClick={() => setMode("signup")}
              className="w-full mt-4 text-gray-500"
            >
              Create account
            </button>
          </>
        )}

        {mode === "signup" && (
          <>
            <h2 className="text-3xl font-semibold mb-6">
              Create account
            </h2>

            <input
              className="w-full p-4 mb-3 border rounded-2xl"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-4 mb-3 border rounded-2xl"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full p-4 mb-4 border rounded-2xl"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={signUp}
              className="
              w-full
              bg-orange-400
              text-white
              p-4
              rounded-2xl
              "
            >
              Create Account
            </button>

            <button
              onClick={() => setMode("login")}
              className="w-full mt-4 text-gray-500"
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  )
}
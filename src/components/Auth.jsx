import { useState } from "react"

export default function Auth({
  mode,
  setMode,
  signIn,
  signUp,
}) {
  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      flex
      items-center
      justify-center
      bg-[#f3eee8]
      "
    >
      {/* BACKGROUND */}

      <div
        className="
        absolute
        top-[-200px]
        left-[-200px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-[#ddd3c6]
        opacity-70
        blur-[180px]
        "
      />

      <div
        className="
        absolute
        bottom-[-250px]
        right-[-250px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-[#ece6dd]
        opacity-90
        blur-[180px]
        "
      />

      <div
        className="
        absolute
        top-[20%]
        right-[15%]
        w-[350px]
        h-[350px]
        rounded-full
        bg-white
        opacity-50
        blur-[120px]
        "
      />

      {/* CARD */}

      <div
        className="
        relative
        z-10
        w-full
        max-w-md
        rounded-[42px]
        bg-white/[0.42]
        backdrop-blur-[40px]
        border
        border-white/70
        p-10
        shadow-[0_30px_100px_rgba(0,0,0,0.05)]
        "
      >
        <div
          className="
          text-[11px]
          uppercase
          tracking-[0.28em]
          text-slate-400
          mb-5
          "
        >
          Energy Journal
        </div>

        <h1
          className="
          text-5xl
          leading-tight
          tracking-tight
          font-semibold
          text-slate-900
          "
        >
          {mode === "login"
            ? "Welcome back"
            : "Create account"}
        </h1>

        <p
          className="
          mt-4
          text-slate-500
          leading-relaxed
          "
        >
          Continue building your
          personal energy story.
        </p>

        {/* NAME */}

        {mode === "signup" && (
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Name"
            className="
            mt-8
            w-full
            rounded-[22px]
            bg-white/60
            border
            border-white
            p-4
            outline-none
            transition-all
            duration-300
            focus:bg-white/80
            "
          />
        )}

        {/* EMAIL */}

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="
          w-full
          rounded-[22px]
          bg-white/60
          border
          border-white
          p-4
          outline-none
          mt-4
          transition-all
          duration-300
          focus:bg-white/80
          "
        />

        {/* PASSWORD */}

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="
          w-full
          rounded-[22px]
          bg-white/60
          border
          border-white
          p-4
          outline-none
          mt-4
          transition-all
          duration-300
          focus:bg-white/80
          "
        />

        {/* BUTTON */}

        {mode === "login" ? (
          <button
            onClick={() =>
              signIn(
                email,
                password
              )
            }
            className="
            w-full
            mt-8
            py-4
            rounded-[22px]
            bg-[#8d8378]
            text-white
            font-medium
            transition-all
            duration-500
            hover:scale-[1.02]
            hover:shadow-[0_20px_60px_rgba(141,131,120,0.25)]
            "
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={() =>
              signUp(
                name,
                email,
                password
              )
            }
            className="
            w-full
            mt-8
            py-4
            rounded-[22px]
            bg-[#8d8378]
            text-white
            font-medium
            transition-all
            duration-500
            hover:scale-[1.02]
            hover:shadow-[0_20px_60px_rgba(141,131,120,0.25)]
            "
          >
            Create Account
          </button>
        )}

        {/* SWITCH */}

        <div
          className="
          mt-8
          text-center
          text-sm
          text-slate-500
          "
        >
          {mode === "login" ? (
            <>
              No account?{" "}
              <button
                onClick={() =>
                  setMode(
                    "signup"
                  )
                }
                className="
                text-slate-900
                font-medium
                transition-all
                duration-300
                hover:text-[#8d8378]
                "
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                onClick={() =>
                  setMode(
                    "login"
                  )
                }
                className="
                text-slate-900
                font-medium
                transition-all
                duration-300
                hover:text-[#8d8378]
                "
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
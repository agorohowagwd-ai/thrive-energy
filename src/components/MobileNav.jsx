import { useState } from "react"

export default function MobileNav({ logout }) {

  const [active, setActive] = useState("home")

  const items = [
    { id: "home", label: "Home" },
    { id: "analytics", label: "Stats" },
    { id: "add", label: "Add" },
    { id: "profile", label: "Profile" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">

      <div className="mx-4 mb-4 rounded-2xl bg-white/70 backdrop-blur-2xl border border-black/5 shadow-lg flex justify-between px-4 py-3">

        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`
              flex-1 py-2 text-xs transition
              ${active === item.id ? "text-[#6A1E2B] font-medium" : "text-black/40"}
            `}
          >
            {item.label}
          </button>
        ))}

      </div>

    </div>
  )
}
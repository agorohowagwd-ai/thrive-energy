import { useState } from "react"

export default function MobileNav({ logout, onAdd }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* FAB BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6
          w-14 h-14
          rounded-full
          bg-[#6A1E2B]
          text-white
          text-2xl
          shadow-xl
          z-50
        "
      >
        +
      </button>

      {/* QUICK ACTIONS PANEL */}
      {open && (
        <div className="
          fixed bottom-24 right-6
          bg-white/90 backdrop-blur-2xl
          border border-black/5
          rounded-2xl
          p-4
          shadow-xl
          flex flex-col gap-3
          z-50
        ">

          <button
            onClick={onAdd}
            className="text-left px-4 py-2 rounded-xl hover:bg-black/5"
          >
            ➕ Add Entry
          </button>

          <button
            onClick={logout}
            className="text-left px-4 py-2 rounded-xl hover:bg-black/5 text-red-500"
          >
            Logout
          </button>

        </div>
      )}
    </>
  )
}
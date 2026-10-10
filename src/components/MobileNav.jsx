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
          bg-obsidian
          text-paper
          text-[29px]
          font-light
          leading-none
          border
          border-white/30
          z-50
        "
      >
        +
      </button>

      {/* QUICK ACTIONS PANEL */}
      {open && (
        <div className="
          fixed bottom-24 right-6
          bg-obsidian text-paper
          min-w-[200px]
          py-2
          flex flex-col
          z-50
        ">

          <button
            onClick={onAdd}
            className="text-left px-6 py-3 text-[16px] border-b border-white/20 hover:pl-8 transition-all duration-800 ease-expo"
          >
            Add Entry
          </button>

          <button
            onClick={logout}
            className="text-left px-6 py-3 text-[16px] text-ash hover:text-paper hover:pl-8 transition-all duration-800 ease-expo"
          >
            Logout
          </button>

        </div>
      )}
    </>
  )
}
import { motion } from "framer-motion"
import { fadeUp } from "../animations/motion"

export default function EntryCard({ entry, onDelete }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.02 }}
      className="
        rounded-2xl
        bg-white/60
        backdrop-blur-xl
        border
        border-black/5
        p-4
        transition
      "
    >
      <div className="flex justify-between items-start">

        <div>
          <div className="font-medium">
            {entry.activity}
          </div>

          <div className="text-xs text-black/40 mt-1">
            {entry.category} • {entry.mood}
          </div>
        </div>

        <div className="text-[#6A1E2B] font-semibold">
          {entry.energy}/10
        </div>

      </div>

      <button
        onClick={() => onDelete(entry.id)}
        className="mt-4 text-xs text-black/30 hover:text-red-500 transition"
      >
        Delete
      </button>
    </motion.div>
  )
}
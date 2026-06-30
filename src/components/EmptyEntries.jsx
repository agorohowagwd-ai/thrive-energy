import { motion } from "framer-motion"
import { fadeIn } from "../animations/motion"

export default function EmptyEntries() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="
        flex
        flex-col
        items-center
        justify-center
        h-[300px]
        text-center
        text-black/40
      "
    >
      <div className="text-5xl mb-4">🌿</div>

      <div className="text-sm">
        Start tracking your energy to unlock insights
      </div>
    </motion.div>
  )
}
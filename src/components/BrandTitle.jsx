import { motion } from "framer-motion"

export default function BrandTitle() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center select-none"
    >
      {/* LOGO */}

      <motion.div
        initial={{ letterSpacing: "0.35em" }}
        animate={{ letterSpacing: "0.18em" }}
        transition={{
          duration: 2,
        }}
        className="
          uppercase
          font-light
          tracking-[0.18em]
          text-[42px]
          text-[#231F20]
        "
      >
        THRIVE
      </motion.div>

      {/* LINE */}

      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: 90,
          opacity: 1,
        }}
        transition={{
          delay: 0.7,
          duration: 0.8,
        }}
        className="
          h-px
          bg-[#6A1E2B]/30
          mx-auto
          mt-5
        "
      />

      {/* MANIFEST */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.8,
        }}
        className="
          mt-5
          text-[13px]
          tracking-[0.28em]
          uppercase
          text-[#6A1E2B]
          font-medium
        "
      >
        Observe • Understand • Grow
      </motion.div>

      {/* SUBTITLE */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.4,
          duration: 1,
        }}
        className="
          mt-5
          text-[15px]
          leading-7
          text-slate-500
          max-w-[280px]
          mx-auto
        "
      >
        Quietly understand
        <br />
        your inner energy.
      </motion.p>

    </motion.div>
  )
}
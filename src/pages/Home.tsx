import { motion } from 'framer-motion'
import me from '../assets/me.jpg'   // <-- relative import (works without any alias)

export default function Home() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.2fr_.8fr] items-center">
      <div>
        {/* ...left side text unchanged... */}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="card overflow-hidden h-60 md:h-72"
      >
        <img
          src={me}
          alt="Ruthwik Dovala"
          className="block w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </section>
  )
}

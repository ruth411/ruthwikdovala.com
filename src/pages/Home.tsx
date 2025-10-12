import { motion } from 'framer-motion'
import me from '@/assets/me.jpg' // <-- imported asset (hashed at build)

export default function Home() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.2fr_.8fr] items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-2"
        >
          Hi, I'm <span className="text-accent">Ruthwik Dovala</span>
        </motion.h1>
        <p className="text-muted">
          CS @ UNCC · ML for environmental monitoring · Fairness in data. I build end-to-end data
          products: clean pipelines, useful analytics, and sleek UIs.
        </p>
      </div>

      {/* Hero photo card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="card overflow-hidden h-60 md:h-72"
      >
        <img
          src={me}
          alt="Ruthwik Dovala"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </motion.div>
    </section>
  )
}

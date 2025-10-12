import { motion } from 'framer-motion'

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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card flex items-center justify-center h-60 md:h-72"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-56 h-56">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <rect width="256" height="256" rx="28" fill="var(--border)" />
          <circle cx="128" cy="96" r="42" fill="url(#g)" />
          <rect x="48" y="152" width="160" height="64" rx="32" fill="var(--card)" stroke="var(--border)" />
        </svg>
      </motion.div>
    </section>
  )
}

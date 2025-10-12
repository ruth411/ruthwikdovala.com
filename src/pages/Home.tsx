import { motion } from 'framer-motion'
import React from 'react'

export default function Home() {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // fallback to a harmless placeholder if the image can’t load
    e.currentTarget.src = '/logo.svg'
  }

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
        className="card overflow-hidden aspect-[4/3] h-60 md:h-72"
      >
        <img
          src="/profile.jpg"            // <-- served from /public
          alt="Ruthwik Dovala"
          className="block w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          onError={handleError}
        />
      </motion.div>
    </section>
  )
}

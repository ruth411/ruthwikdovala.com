import { motion } from 'framer-motion'

export default function Home() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-4">
      <div className="w-full max-w-5xl grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left text-4xl md:text-6xl font-extrabold"
        >
          I am Ruthwik Dovala, an AI/ML engineer.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center md:justify-end"
        >
          <img
            src="/bitmoji.png"
            alt="Ruthwik Bitmoji waving hello"
            className="w-[240px] sm:w-[300px] md:w-[360px] h-auto object-contain drop-shadow-2xl"
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = '/profile.jpg'
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

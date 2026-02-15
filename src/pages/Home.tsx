import { motion } from 'framer-motion'

export default function Home() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center py-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold"
      >
        I am Ruthwik Dovala, an AI/ML engineer.
      </motion.h1>
    </section>
  )
}

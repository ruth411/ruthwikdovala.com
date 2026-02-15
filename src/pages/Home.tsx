import { motion } from 'framer-motion'

export default function Home() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center py-4">
      <div className="flex flex-col items-center gap-4">
        <motion.img
          src="/hello-sticker.png"
          alt="Hello sticker"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[190px] sm:w-[230px] md:w-[270px] h-auto object-contain"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          I am Ruthwik Dovala, an AI/ML engineer.
        </motion.h1>
      </div>
    </section>
  )
}

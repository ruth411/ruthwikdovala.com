import { useState } from 'react'
import { motion } from 'framer-motion'
import helloSticker from '../assets/hello-sticker.png'

export default function Home() {
  const [stickerFailed, setStickerFailed] = useState(false)

  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center py-4">
      <div className="flex flex-col items-center gap-4">
        {stickerFailed ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-3 text-3xl md:text-4xl font-extrabold tracking-wide text-accent"
            aria-label="Hello sticker fallback"
          >
            HELLO
          </motion.div>
        ) : (
          <motion.img
            src={helloSticker}
            alt="Hello sticker"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[190px] sm:w-[230px] md:w-[270px] h-auto object-contain"
            loading="eager"
            decoding="async"
            onError={() => setStickerFailed(true)}
          />
        )}
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

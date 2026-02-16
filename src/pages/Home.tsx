import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import helloSticker from '../assets/hello-sticker.png'
import Projects from './Projects'
import Skills from './Skills'
import Contact from './Contact'

export default function Home() {
  const [stickerFailed, setStickerFailed] = useState(false)
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <section id="about" className="min-h-screen flex items-center justify-center text-center py-4 scroll-mt-24">
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
          <motion.button
            type="button"
            onClick={scrollToProjects}
            aria-label="Scroll down to projects"
            className="mt-3 inline-flex flex-col items-center text-muted hover:text-foreground transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-sm">Scroll Down</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1"
            >
              <ChevronDown size={24} />
            </motion.span>
          </motion.button>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="pt-10"
        >
          <div className="mx-auto mb-10 h-px w-[min(86vw,950px)] bg-gradient-to-r from-transparent via-border to-transparent" />
          <Projects />
        </motion.div>
      </section>

      <section id="skills" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="pt-10"
        >
          <div className="mx-auto mb-10 h-px w-[min(86vw,950px)] bg-gradient-to-r from-transparent via-border to-transparent" />
          <Skills />
        </motion.div>
      </section>

      <section id="contact" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="pt-10"
        >
          <div className="mx-auto mb-10 h-px w-[min(86vw,950px)] bg-gradient-to-r from-transparent via-border to-transparent" />
          <Contact />
        </motion.div>
      </section>
    </div>
  )
}

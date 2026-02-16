import { useState } from 'react'
import { motion } from 'framer-motion'
import helloSticker from '../assets/hello-sticker.png'
import Projects from './Projects'
import Skills from './Skills'
import Contact from './Contact'

export default function Home() {
  const [stickerFailed, setStickerFailed] = useState(false)
  const linkCls =
    'inline-flex items-center justify-center rounded-2xl border px-3 py-2 text-sm font-medium bg-background/80 border-border opacity-85 hover:opacity-100 hover:border-accent hover:text-accent transition'

  return (
    <div>
      <section id="about" className="min-h-[70vh] flex items-center justify-center text-center py-4 scroll-mt-24">
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
          <motion.nav
            aria-label="Primary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2"
          >
            <ul className="flex flex-wrap items-center justify-center gap-2">
              <li>
                <a href="#about" className={linkCls}>
                  About
                </a>
              </li>
              <li>
                <a href="/RuthwikDovala.pdf" target="_blank" rel="noreferrer" className={linkCls}>
                  Resume
                </a>
              </li>
              <li>
                <a href="https://trillm.ruthwikdovala.com" target="_blank" rel="noreferrer" className={linkCls}>
                  TriLLM
                </a>
              </li>
              <li>
                <a href="#projects" className={linkCls}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className={linkCls}>
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className={linkCls}>
                  Contact
                </a>
              </li>
            </ul>
          </motion.nav>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="pt-10"
        >
          <div className="mx-auto mb-10 h-px w-[min(86vw,950px)] bg-gradient-to-r from-transparent via-border to-transparent" />
          <Projects />
        </motion.div>
      </section>

      <section id="skills" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="pt-10"
        >
          <div className="mx-auto mb-10 h-px w-[min(86vw,950px)] bg-gradient-to-r from-transparent via-border to-transparent" />
          <Skills />
        </motion.div>
      </section>

      <section id="contact" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="pt-10"
        >
          <div className="mx-auto mb-10 h-px w-[min(86vw,950px)] bg-gradient-to-r from-transparent via-border to-transparent" />
          <Contact />
        </motion.div>
      </section>
    </div>
  )
}

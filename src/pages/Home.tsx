import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import helloSticker from '../assets/hello-sticker.png'

export default function Home() {
  const [stickerFailed, setStickerFailed] = useState(false)
  const linkCls = (isActive: boolean) =>
    `inline-flex items-center justify-center rounded-2xl border px-3 py-2 text-sm font-medium bg-background/80 backdrop-blur transition ${
      isActive ? 'border-accent text-accent' : 'border-border opacity-85 hover:opacity-100'
    }`

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
        <motion.nav
          aria-label="Primary"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2"
        >
          <ul className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <NavLink to="/" end className={({ isActive }) => linkCls(isActive)}>
                About
              </NavLink>
            </li>
            <li>
              <a href="/RuthwikDovala.pdf" target="_blank" rel="noreferrer" className={linkCls(false)}>
                Resume
              </a>
            </li>
            <li>
              <a href="https://trillm.ruthwikdovala.com" target="_blank" rel="noreferrer" className={linkCls(false)}>
                TriLLM
              </a>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => linkCls(isActive)}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/skills" className={({ isActive }) => linkCls(isActive)}>
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => linkCls(isActive)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </motion.nav>
      </div>
    </section>
  )
}

import { Outlet, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HeroFluidBackground from '../components/HeroFluidBackground'

export default function App() {
  const [theme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const linkCls = (isActive: boolean) =>
    `inline-flex items-center justify-center rounded-2xl border px-3 py-2 text-sm font-medium bg-background/80 backdrop-blur transition ${
      isActive ? 'border-accent text-accent' : 'border-border opacity-85 hover:opacity-100'
    }`

  return (
    <div className="min-h-screen bg-background/70 text-foreground flex flex-col relative isolate">
      <HeroFluidBackground rounded={false} className="z-0" />
      <main className="container py-8 pb-32 flex-1 relative z-10">
        <Outlet />
      </main>

      <nav
        aria-label="Primary"
        className="fixed left-1/2 bottom-4 z-50 -translate-x-1/2 w-[min(96vw,900px)]"
      >
        <div className="rounded-3xl border border-border bg-card/70 backdrop-blur px-3 py-3 shadow-soft">
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
        </div>
      </nav>

      <footer className="mt-auto pb-24 pt-8 text-sm text-muted relative z-10">
        <div className="container text-center">
          © {new Date().getFullYear()} Ruthwik Dovala. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

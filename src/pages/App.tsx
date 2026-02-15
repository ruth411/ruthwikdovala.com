import { Outlet, NavLink } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import HeroFluidBackground from '../components/HeroFluidBackground'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    }
    return 'dark'
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const linkCls = (isActive: boolean) =>
    `chip ${isActive ? 'border-accent text-accent' : 'opacity-80 hover:opacity-100'}`

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="min-h-screen bg-background/70 text-foreground flex flex-col relative isolate">
      <HeroFluidBackground rounded={false} className="z-0" />
      {/* sticky so the menu button stays visible on scroll */}
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="container flex items-center justify-between py-4">
          <NavLink
            to="/"
            className="font-extrabold text-xl bg-gradient-to-tr from-accent to-accent2 bg-clip-text text-transparent"
            onClick={closeMobile}
          >
            RD
          </NavLink>

          {/* Desktop nav */}
          <ul className="hidden sm:flex gap-2">
            {/* About */}
            <li>
              <NavLink to="/" end className={({ isActive }) => linkCls(isActive)}>
                About
              </NavLink>
            </li>

            {/* Résumé (opens PDF from /public) */}
            <li>
              <a
                href="/RuthwikDovala.pdf"
                target="_blank"
                rel="noreferrer"
                className="chip opacity-80 hover:opacity-100"
              >
                Résumé
              </a>
            </li>

            {/* TriLLM */}
            <li>
              <a
                href="https://trillm.ruthwikdovala.com"
                target="_blank"
                rel="noreferrer"
                className="chip opacity-80 hover:opacity-100"
              >
                TriLLM
              </a>
            </li>

            {/* Other pages */}
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

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              className="chip"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="chip sm:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div id="mobile-nav" className="sm:hidden border-t border-border">
            <div className="container py-3 flex flex-col gap-2">
              <NavLink to="/" end className={({ isActive }) => linkCls(isActive)} onClick={closeMobile}>
                About
              </NavLink>
              <a
                href="/RuthwikDovala.pdf"
                target="_blank"
                rel="noreferrer"
                className="chip opacity-80 hover:opacity-100"
                onClick={closeMobile}
              >
                Résumé
              </a>
              <a
                href="https://trillm.ruthwikdovala.com"
                target="_blank"
                rel="noreferrer"
                className="chip opacity-80 hover:opacity-100"
                onClick={closeMobile}
              >
                TriLLM
              </a>
              <NavLink to="/projects" className={({ isActive }) => linkCls(isActive)} onClick={closeMobile}>
                Projects
              </NavLink>
              <NavLink to="/skills" className={({ isActive }) => linkCls(isActive)} onClick={closeMobile}>
                Skills
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => linkCls(isActive)} onClick={closeMobile}>
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="container py-8 flex-1 relative z-10">
        <Outlet />
      </main>

      <footer className="mt-auto py-8 text-sm text-muted relative z-10">
        <div className="container text-center">
          © {new Date().getFullYear()} Ruthwik Dovala. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

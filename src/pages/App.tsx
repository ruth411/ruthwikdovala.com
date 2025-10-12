import { Outlet, NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <nav className="container flex items-center justify-between py-4">
          <NavLink
            to="/"
            className="font-extrabold text-xl bg-gradient-to-tr from-accent to-accent2 bg-clip-text text-transparent"
          >
            RD
          </NavLink>
          <div className="flex items-center gap-3">
            <ul className="hidden sm:flex gap-4">
              <li><NavLink to="/" end className={({isActive})=> isActive ? 'chip' : 'opacity-80 hover:opacity-100'}>About</NavLink></li>
              <li><NavLink to="/projects" className={({isActive})=> isActive ? 'chip' : 'opacity-80 hover:opacity-100'}>Projects</NavLink></li>
              <li><NavLink to="/skills" className={({isActive})=> isActive ? 'chip' : 'opacity-80 hover:opacity-100'}>Skills</NavLink></li>
              <li><NavLink to="/contact" className={({isActive})=> isActive ? 'chip' : 'opacity-80 hover:opacity-100'}>Contact</NavLink></li>
            </ul>
            <button className="chip" onClick={()=> setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">
              {theme==='dark' ? <Sun size={16}/> : <Moon size={16}/>}
              <span className="hidden sm:inline">{theme==='dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="container py-8 flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto py-8 text-sm text-muted">
        <div className="container text-center">
          © {new Date().getFullYear()} Ruthwik Dovala. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

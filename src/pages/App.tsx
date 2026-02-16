import { Outlet } from 'react-router-dom'
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

  return (
    <div className="min-h-screen bg-background/70 text-foreground flex flex-col relative isolate">
      <HeroFluidBackground rounded={false} className="z-0" />
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

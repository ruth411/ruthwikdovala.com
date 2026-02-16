import { Outlet } from 'react-router-dom'
import { Github, Linkedin } from 'lucide-react'
import HeroFluidBackground from '../components/HeroFluidBackground'

export default function App() {
  return (
    <div className="min-h-screen bg-background/70 text-foreground flex flex-col relative isolate">
      <HeroFluidBackground rounded={false} className="z-0" />

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <a
          href="https://github.com/ruth411"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur p-2 text-foreground hover:text-accent hover:border-accent transition"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/ruth8/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur p-2 text-foreground hover:text-accent hover:border-accent transition"
        >
          <Linkedin size={18} />
        </a>
      </div>

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

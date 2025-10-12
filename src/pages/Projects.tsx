export default function Projects() {
  const items = [
    { title: 'AI‑Powered Music Generator', desc: 'Text-to-music experiments exploring controllable generation and evaluation.', href: '#' },
    { title: 'AI‑Based Traffic Signal Simulation', desc: 'Adaptive signal timing with queue-based state and rewards — camera-free.', href: '#' },
    { title: 'Graph Algorithms Toolkit', desc: 'Directed/undirected graphs + Dijkstra shortest paths in Python.', href: '#' },
    { title: 'YC Job‑Market Pipeline', desc: 'Scraping → cleaning → Spark SQL insights on roles & skills.', href: '#' },
  ]
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((p) => (
          <article key={p.title} className="card">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-muted mb-3">{p.desc}</p>
            <a className="chip" href={p.href} aria-disabled="true">Link</a>
          </article>
        ))}
      </div>
    </section>
  )
}
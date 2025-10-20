import { useMemo, useState } from 'react'
import { Mail, Coffee, Handshake, ArrowRight } from 'lucide-react'

export default function Contact() {
  // ✅ your real email
  const TO = 'dovalaruthwik1@gmail.com'
  const SCHED_LINK = '#' // e.g., 'https://cal.com/your-handle/intro' (optional)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isCollab, setIsCollab] = useState(false)

  const mailtoHref = useMemo(() => {
    const subject = `${isCollab ? '[Collaboration] ' : ''}Message from ${name || 'your website'}`
    const body = [
      `Hi Ruthwik,`,
      '',
      message || '(Write your message here)',
      '',
      `— ${name || '(your name)'} ${email ? `<${email}>` : ''}`
    ].join('\n')
    return `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [TO, name, email, message, isCollab])

  const canSend = name.trim() && email.trim() && message.trim()

  return (
    <section className="container">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Let&apos;s Connect</h1>
        <p className="text-muted">
          Have a project idea? Want to chat about tech? Interested in collaborations? I&apos;d love
          to hear from you!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        {/* LEFT: contact options */}
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="inline-block rounded-full border border-border px-2 py-1">💬</span>
            Get in Touch
          </h2>
          <p className="text-muted mb-4">
            I’m always excited to connect with fellow developers, researchers, and curious minds.
            Choose your preferred way to reach out.
          </p>

          <div className="space-y-4">
            {/* Email card */}
            <div className="card flex items-center gap-4">
              <div className="shrink-0 rounded-xl border border-border p-3">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted text-sm">Drop me a line anytime</p>
                <a href={`mailto:${TO}`} className="chip mt-2 inline-block">
                  {TO}
                </a>
              </div>
            </div>

            {/* Coffee chat card (optional) */}
            <div className="card flex items-center gap-4">
              <div className="shrink-0 rounded-xl border border-border p-3">
                <Coffee size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Coffee Chat</h3>
                <p className="text-muted text-sm">Let&apos;s grab a quick virtual coffee</p>
                <a href={SCHED_LINK} className="chip mt-2 inline-block" target="_blank" rel="noreferrer">
                  Schedule a call
                </a>
              </div>
            </div>

            {/* Collaborations card */}
            <div className="card flex items-center gap-4">
              <div className="shrink-0 rounded-xl border border-border p-3">
                <Handshake size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Collaborations</h3>
                <p className="text-muted text-sm">Partnership &amp; project opportunities</p>
                <a
                  className="chip mt-2 inline-flex items-center gap-2"
                  href={`mailto:${TO}?subject=${encodeURIComponent('[Collaboration] Hi Ruthwik')}`}
                >
                  Let&apos;s collaborate <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: message form */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Send a Message</h3>

          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full rounded-xl border border-border bg-card px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-xl border border-border bg-card px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="inline-flex items-center gap-2 mb-4 select-none">
            <input
              type="checkbox"
              className="rounded border-border"
              checked={isCollab}
              onChange={(e) => setIsCollab(e.target.checked)}
            />
            <span className="text-sm">This is regarding a brand collaboration</span>
          </label>

          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full min-h-[140px] rounded-xl border border-border bg-card px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            placeholder="Tell me about your project, question, or say hello!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <a
            href={mailtoHref}
            className={`btn btn-primary w-full justify-center ${!canSend ? 'pointer-events-none opacity-60' : ''}`}
            aria-disabled={!canSend}
          >
            Send Message <ArrowRight size={16} />
          </a>

          <p className="text-muted text-xs mt-3">
            This opens your email client with the message pre-filled.
          </p>
        </div>
      </div>
    </section>
  )
}

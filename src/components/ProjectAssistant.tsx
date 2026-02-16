import { useEffect, useMemo, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { askProjectAssistant, type AssistantSource, type AssistantTurn } from '../lib/api'

type Props = {
  selectedProjectId?: string
  seedQuestion?: string
  onSeedConsumed?: () => void
}

type Message = {
  role: 'user' | 'assistant'
  content: string
  sources?: AssistantSource[]
}

const QUICK_PROMPTS: { label: string; question: string; projectId?: string }[] = [
  { label: 'Explain TriLLM', question: 'Explain TriLLM in simple terms.', projectId: 'trillm' },
  { label: 'Explain MacroMap', question: 'What problem does MacroMap solve?', projectId: 'macromap' },
  { label: 'Your role', question: 'What was your role in these projects?' },
  { label: 'Best ML project', question: 'Which project best showcases practical ML work and why?' },
]

export default function ProjectAssistant({ selectedProjectId, seedQuestion, onSeedConsumed }: Props) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const history: AssistantTurn[] = useMemo(
    () => messages.map((m) => ({ role: m.role, content: m.content })),
    [messages],
  )

  const send = async (question: string, scopedProjectId?: string) => {
    const trimmed = question.trim()
    if (!trimmed || isLoading) return

    setError(null)
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await askProjectAssistant({
        message: trimmed,
        projectId: scopedProjectId,
        history,
      })

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.answer,
          sources: response.sources,
        },
      ])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to get assistant response.'
      setError(msg)
    } finally {
      setIsLoading(false)
      onSeedConsumed?.()
    }
  }

  useEffect(() => {
    if (seedQuestion) {
      void send(seedQuestion, selectedProjectId)
    }
    // Intentionally only reacts to fresh seed values from parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedQuestion])

  return (
    <section className="card mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} />
        <h3 className="text-lg font-semibold">Ask AI About My Projects</h3>
      </div>
      <p className="text-sm text-muted mb-4">
        Ask anything about project goals, stack choices, implementation approach, or outcomes.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_PROMPTS.map((item) => (
          <button
            key={item.label}
            type="button"
            className="chip hover:border-accent hover:text-accent transition"
            onClick={() => void send(item.question, item.projectId)}
            disabled={isLoading}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-3 min-h-[200px] max-h-[420px] overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-muted">No messages yet. Try a quick prompt above.</p>
        ) : (
          messages.map((m, i) => (
            <div key={`${m.role}-${i}`} className="space-y-1">
              <p className={`text-sm ${m.role === 'assistant' ? 'text-foreground' : 'text-accent'}`}>
                <span className="font-semibold mr-1">{m.role === 'assistant' ? 'AI' : 'You'}:</span>
                {m.content}
              </p>
              {m.role === 'assistant' && m.sources && m.sources.length > 0 ? (
                <p className="text-xs text-muted">
                  Sources: {m.sources.slice(0, 3).map((s) => `${s.projectId}:${s.source}`).join(' | ')}
                </p>
              ) : null}
            </div>
          ))
        )}

        {isLoading ? (
          <div className="text-sm text-muted inline-flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Thinking...
          </div>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-400 mt-3">{error}</p> : null}

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          void send(input, selectedProjectId)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about any project..."
          className="w-full rounded-xl border border-border bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn btn-primary disabled:opacity-50 disabled:pointer-events-none"
        >
          Ask
        </button>
      </form>
    </section>
  )
}

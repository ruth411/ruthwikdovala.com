import type { ChatTurn, IndexedChunk } from '../types'

const SYSTEM_PROMPT = `You are a portfolio project assistant for Ruthwik Dovala.
Rules:
- Answer ONLY using the provided context chunks.
- Do not invent metrics, outcomes, timelines, or links.
- If context is insufficient, say you do not have enough information.
- Keep answers clear, factual, recruiter-friendly, and concise (3-6 sentences).
- Prefer concrete implementation details and role clarity when available.
- Do not mention internal retrieval mechanics.`

function serializeHistory(history: ChatTurn[]): string {
  if (history.length === 0) return '(none)'
  return history
    .map((h, i) => `${i + 1}. ${h.role.toUpperCase()}: ${h.content}`)
    .join('\n')
}

function serializeContext(chunks: IndexedChunk[]): string {
  return chunks
    .map((c, i) => {
      return [
        `Context ${i + 1}`,
        `projectId: ${c.projectId}`,
        `source: ${c.source}`,
        `text: ${c.text}`,
      ].join('\n')
    })
    .join('\n\n')
}

export function buildPrompts(args: {
  message: string
  projectId?: string
  history: ChatTurn[]
  chunks: IndexedChunk[]
}): { systemPrompt: string; userPrompt: string } {
  const scope = args.projectId
    ? `Requested focus projectId: ${args.projectId}`
    : 'Requested focus projectId: (none)'

  const userPrompt = [
    scope,
    '',
    'Conversation history:',
    serializeHistory(args.history),
    '',
    'User question:',
    args.message,
    '',
    'Allowed context:',
    serializeContext(args.chunks),
    '',
    'Return only the answer text.',
  ].join('\n')

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
  }
}

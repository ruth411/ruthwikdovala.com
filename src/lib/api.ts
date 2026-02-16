export type AssistantTurn = {
  role: 'user' | 'assistant'
  content: string
}

export type AssistantSource = {
  projectId: string
  source: string
}

export type AssistantResponse = {
  answer: string
  sources: AssistantSource[]
  usedProjectIds: string[]
}

const API_BASE = import.meta.env.VITE_LLM_API_BASE || 'http://localhost:8787'

export async function askProjectAssistant(args: {
  message: string
  projectId?: string
  history: AssistantTurn[]
}): Promise<AssistantResponse> {
  const res = await fetch(`${API_BASE}/api/project-assistant/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const detail = body?.error || 'Assistant request failed'
    throw new Error(detail)
  }

  return res.json() as Promise<AssistantResponse>
}

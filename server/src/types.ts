export type ProjectCategory = 'live' | 'publication' | 'other'

export type ProjectLink = {
  label: string
  url: string
}

export type ProjectDoc = {
  id: string
  title: string
  category: ProjectCategory
  oneLiner: string
  problem: string
  role: string
  stack: string[]
  approach: string[]
  outcomes: string[]
  links: ProjectLink[]
  constraints: string[]
  futureWork: string[]
}

export type ProjectFaq = {
  projectId: string
  q: string
  a: string
}

export type IndexedChunk = {
  id: string
  projectId: string
  text: string
  source: string
  embedding: number[]
}

export type ChatRole = 'user' | 'assistant'

export type ChatTurn = {
  role: ChatRole
  content: string
}

export type ChatRequest = {
  message: string
  projectId?: string
  history?: ChatTurn[]
}

export type SourceRef = {
  projectId: string
  source: string
}

export type ChatResponse = {
  answer: string
  sources: SourceRef[]
  usedProjectIds: string[]
}

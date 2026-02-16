import { z } from 'zod'
import type { ChatRequest, ProjectDoc, ProjectFaq } from '../types'

const chatTurnSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(1200),
})

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(700),
  projectId: z.string().trim().min(1).max(120).optional(),
  history: z.array(chatTurnSchema).max(8).optional(),
})

export const projectDocSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  category: z.enum(['live', 'publication', 'other']),
  oneLiner: z.string().trim().min(1),
  problem: z.string().trim().min(1),
  role: z.string().trim().min(1),
  stack: z.array(z.string().trim().min(1)),
  approach: z.array(z.string().trim().min(1)),
  outcomes: z.array(z.string().trim().min(1)),
  links: z.array(z.object({ label: z.string().trim().min(1), url: z.string().url() })),
  constraints: z.array(z.string().trim().min(1)),
  futureWork: z.array(z.string().trim().min(1)),
})

export const faqSchema = z.object({
  projectId: z.string().trim().min(1),
  q: z.string().trim().min(1),
  a: z.string().trim().min(1),
})

export const projectDocsSchema = z.array(projectDocSchema)
export const faqListSchema = z.array(faqSchema)

export function parseChatRequest(raw: unknown): ChatRequest {
  return chatRequestSchema.parse(raw)
}

export function parseProjectDocs(raw: unknown): ProjectDoc[] {
  return projectDocsSchema.parse(raw)
}

export function parseFaq(raw: unknown): ProjectFaq[] {
  return faqListSchema.parse(raw)
}

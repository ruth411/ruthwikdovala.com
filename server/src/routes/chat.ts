import { Router } from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import { ZodError } from 'zod'
import { generateGroundedAnswer, embedText } from '../lib/embed'
import { buildPrompts } from '../lib/prompt'
import { retrieveRelevantChunks, uniqueSources } from '../lib/retrieval'
import { parseChatRequest, parseProjectDocs } from '../lib/validate'
import type { ChatResponse } from '../types'

export const chatRouter = Router()

let knownProjectIdsCache: Set<string> | null = null

async function getKnownProjectIds(): Promise<Set<string>> {
  if (knownProjectIdsCache) return knownProjectIdsCache
  const filePath = process.cwd().endsWith('/server')
    ? path.resolve(process.cwd(), '../llm-data/projects.json')
    : path.resolve(process.cwd(), 'llm-data/projects.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  const projects = parseProjectDocs(JSON.parse(raw))
  knownProjectIdsCache = new Set(projects.map((p) => p.id))
  return knownProjectIdsCache
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('LLM request timeout')), timeoutMs)
    promise
      .then((value) => {
        clearTimeout(id)
        resolve(value)
      })
      .catch((err) => {
        clearTimeout(id)
        reject(err)
      })
  })
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

chatRouter.post('/chat', async (req, res) => {
  try {
    const parsed = parseChatRequest(req.body)
    const input = {
      ...parsed,
      message: stripHtml(parsed.message),
      history: (parsed.history ?? []).map((h) => ({
        ...h,
        content: stripHtml(h.content),
      })),
    }
    if (!input.message) {
      return res.status(400).json({ error: 'Message cannot be empty' })
    }

    if (input.projectId) {
      const known = await getKnownProjectIds()
      if (!known.has(input.projectId)) {
        return res.status(400).json({ error: `Unknown projectId: ${input.projectId}` })
      }
    }

    const queryEmbedding = await embedText(input.message)
    const { chunks, maxScore } = await retrieveRelevantChunks({
      queryEmbedding,
      projectId: input.projectId,
      topK: 8,
    })

    if (chunks.length === 0 || maxScore < 0.12) {
      const fallback: ChatResponse = {
        answer: "I don't have enough information about that yet. Please ask about one of the listed projects.",
        sources: [],
        usedProjectIds: [],
      }
      return res.json(fallback)
    }

    const topContext = chunks.slice(0, 5)
    const prompts = buildPrompts({
      message: input.message,
      projectId: input.projectId,
      history: input.history ?? [],
      chunks: topContext,
    })

    const answer = await withTimeout(
      generateGroundedAnswer({
        systemPrompt: prompts.systemPrompt,
        userPrompt: prompts.userPrompt,
      }),
      12_000,
    )

    const sources = uniqueSources(topContext)
    const usedProjectIds = [...new Set(topContext.map((c) => c.projectId))]

    const payload: ChatResponse = {
      answer: answer || "I don't have enough information to answer that precisely.",
      sources,
      usedProjectIds,
    }

    return res.json(payload)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: 'Invalid request', details: err.issues })
    }

    const msg = err instanceof Error ? err.message : 'Unknown error'
    return res.status(500).json({
      error: 'Project assistant failed',
      details: msg,
    })
  }
})

import fs from 'node:fs/promises'
import path from 'node:path'
import type { IndexedChunk } from '../types'

let cachedIndex: IndexedChunk[] | null = null

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0 || a.length !== b.length) return -1
  let dot = 0
  let aNorm = 0
  let bNorm = 0
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i]
    aNorm += a[i] * a[i]
    bNorm += b[i] * b[i]
  }
  if (aNorm === 0 || bNorm === 0) return -1
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm))
}

async function loadIndex(): Promise<IndexedChunk[]> {
  if (cachedIndex) return cachedIndex

  const filePath = process.cwd().endsWith('/server')
    ? path.resolve(process.cwd(), 'data/index.json')
    : path.resolve(process.cwd(), 'server/data/index.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  const parsed = JSON.parse(raw) as IndexedChunk[]
  cachedIndex = parsed
  return parsed
}

export async function retrieveRelevantChunks(args: {
  queryEmbedding: number[]
  projectId?: string
  topK?: number
}): Promise<{ chunks: IndexedChunk[]; maxScore: number }> {
  const topK = args.topK ?? 8
  const index = await loadIndex()

  const scored = index
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(args.queryEmbedding, chunk.embedding),
    }))
    .filter((x) => x.score > 0)

  const boosted = scored.map((x) => {
    if (args.projectId && x.chunk.projectId === args.projectId) {
      return { ...x, score: x.score + 0.08 }
    }
    return x
  })

  boosted.sort((a, b) => b.score - a.score)

  const top = boosted.slice(0, topK)
  const maxScore = top[0]?.score ?? 0

  return {
    chunks: top.map((x) => x.chunk),
    maxScore,
  }
}

export function uniqueSources(chunks: IndexedChunk[]): { projectId: string; source: string }[] {
  const seen = new Set<string>()
  const result: { projectId: string; source: string }[] = []
  for (const c of chunks) {
    const key = `${c.projectId}::${c.source}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ projectId: c.projectId, source: c.source })
    }
  }
  return result
}

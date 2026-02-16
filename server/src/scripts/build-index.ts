import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { embedBatch } from '../lib/embed'
import { parseFaq, parseProjectDocs } from '../lib/validate'
import type { IndexedChunk, ProjectDoc, ProjectFaq } from '../types'

type RawChunk = {
  id: string
  projectId: string
  source: string
  text: string
}

function normalizeText(parts: string[]): string {
  return parts
    .map((p) => p.trim())
    .filter(Boolean)
    .join('\n')
}

function projectChunks(project: ProjectDoc): RawChunk[] {
  const chunks: RawChunk[] = []

  chunks.push({
    id: `${project.id}:summary`,
    projectId: project.id,
    source: `projects.${project.id}.summary`,
    text: normalizeText([
      `Title: ${project.title}`,
      `Category: ${project.category}`,
      `One-liner: ${project.oneLiner}`,
      `Problem: ${project.problem}`,
      `Role: ${project.role}`,
      `Stack: ${project.stack.join(', ')}`,
    ]),
  })

  chunks.push({
    id: `${project.id}:approach`,
    projectId: project.id,
    source: `projects.${project.id}.approach`,
    text: normalizeText(['Approach:', ...project.approach.map((x) => `- ${x}`)]),
  })

  chunks.push({
    id: `${project.id}:outcomes`,
    projectId: project.id,
    source: `projects.${project.id}.outcomes`,
    text: normalizeText([
      'Outcomes:',
      ...project.outcomes.map((x) => `- ${x}`),
      'Constraints:',
      ...project.constraints.map((x) => `- ${x}`),
      'Future work:',
      ...project.futureWork.map((x) => `- ${x}`),
      'Links:',
      ...(project.links.length ? project.links.map((l) => `- ${l.label}: ${l.url}`) : ['- none']),
    ]),
  })

  return chunks
}

function faqChunks(items: ProjectFaq[]): RawChunk[] {
  return items.map((f, i) => ({
    id: `${f.projectId}:faq:${i + 1}`,
    projectId: f.projectId,
    source: `faq.${f.projectId}.${i + 1}`,
    text: normalizeText([`Q: ${f.q}`, `A: ${f.a}`]),
  }))
}

async function loadData() {
  const root = path.resolve(process.cwd(), '..')
  const projectPath =
    process.cwd().endsWith('/server')
      ? path.resolve(root, 'llm-data/projects.json')
      : path.resolve(process.cwd(), 'llm-data/projects.json')
  const faqPath =
    process.cwd().endsWith('/server')
      ? path.resolve(root, 'llm-data/faq.json')
      : path.resolve(process.cwd(), 'llm-data/faq.json')

  const projectRaw = JSON.parse(await fs.readFile(projectPath, 'utf-8'))
  const faqRaw = JSON.parse(await fs.readFile(faqPath, 'utf-8'))

  const projects = parseProjectDocs(projectRaw)
  const faq = parseFaq(faqRaw)

  return { projects, faq }
}

async function writeIndex(index: IndexedChunk[]) {
  const outPath = process.cwd().endsWith('/server')
    ? path.resolve(process.cwd(), 'data/index.json')
    : path.resolve(process.cwd(), 'server/data/index.json')
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, JSON.stringify(index, null, 2), 'utf-8')
}

async function main() {
  const { projects, faq } = await loadData()
  const chunks = [...projects.flatMap(projectChunks), ...faqChunks(faq)]

  const embeddings = await embedBatch(chunks.map((c) => c.text))
  if (embeddings.length !== chunks.length) {
    throw new Error('Embedding count mismatch while building index')
  }

  const index: IndexedChunk[] = chunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
  }))

  await writeIndex(index)

  // eslint-disable-next-line no-console
  console.log(`Built index with ${index.length} chunks -> server/data/index.json`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

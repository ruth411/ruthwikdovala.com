import OpenAI from 'openai'

const embeddingModel = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small'
const answerModel = process.env.OPENAI_CHAT_MODEL || 'gpt-4.1-mini'

let client: OpenAI | null = null

function getClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY')
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return client
}

export async function embedText(text: string): Promise<number[]> {
  const c = getClient()
  const res = await c.embeddings.create({
    model: embeddingModel,
    input: text,
  })
  return res.data[0].embedding
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return []
  const c = getClient()
  const res = await c.embeddings.create({
    model: embeddingModel,
    input: texts,
  })
  return res.data.map((x) => x.embedding)
}

export async function generateGroundedAnswer(args: {
  systemPrompt: string
  userPrompt: string
}): Promise<string> {
  const c = getClient()
  const res = await c.responses.create({
    model: answerModel,
    input: [
      { role: 'system', content: args.systemPrompt },
      { role: 'user', content: args.userPrompt },
    ],
    temperature: 0.2,
    max_output_tokens: 380,
  })

  return (res.output_text || '').trim()
}

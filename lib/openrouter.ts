/**
 * OpenRouter integration: curated playground models and catalogue fetching.
 * The API key is read ONLY in app/api/generate/route.ts from process.env —
 * never import secrets here so this module stays safe for client bundles.
 */

export interface PlaygroundModel {
  id: string
  label: string
  contextLength: number
  note: string
}

/**
 * Server-side allowlist for the live playground.
 * Free-tier routes only, verified working against the OpenRouter API on 2026-06-10.
 * Order matters: the first entry is the default and fallback routing follows array order.
 */
export const PLAYGROUND_MODELS: PlaygroundModel[] = [
  {
    id: "openai/gpt-oss-120b:free",
    label: "GPT-OSS 120B",
    contextLength: 131072,
    note: "OpenAI's open-weight model. Reliable general default.",
  },
  {
    id: "moonshotai/kimi-k2.6:free",
    label: "Kimi K2.6",
    contextLength: 262144,
    note: "Strong long-context generalist from MoonshotAI.",
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    label: "Llama 3.3 70B",
    contextLength: 131072,
    note: "Meta's dependable instruction-tuned workhorse.",
  },
  {
    id: "qwen/qwen3-next-80b-a3b-instruct:free",
    label: "Qwen3 Next 80B",
    contextLength: 262144,
    note: "Efficient mixture-of-experts instruct model from Qwen.",
  },
  {
    id: "z-ai/glm-4.5-air:free",
    label: "GLM 4.5 Air",
    contextLength: 131072,
    note: "Lightweight bilingual model from Z.ai.",
  },
]

export const DEFAULT_MODEL_ID: string = PLAYGROUND_MODELS[0].id

export function isAllowedModel(id: string): boolean {
  return PLAYGROUND_MODELS.some((model) => model.id === id)
}

// OpenRouter rejects `models` arrays longer than 3 items (400, verified 2026-06-10).
const OPENROUTER_MAX_FALLBACK_MODELS = 3

/** Requested model first, then allowlist fallbacks, capped to OpenRouter's limit. */
export function buildFallbackChain(requestedModel: string): string[] {
  const chain = [requestedModel, ...PLAYGROUND_MODELS.map((m) => m.id).filter((id) => id !== requestedModel)]
  return chain.slice(0, OPENROUTER_MAX_FALLBACK_MODELS)
}

/** Slim row used by the /models directory page and table. */
export interface ModelRow {
  id: string
  name: string
  contextLength: number
  promptPerM: number
  completionPerM: number
  modality: string
  isFree: boolean
  created: number
}

interface RawOpenRouterModel {
  id: string
  name: string
  created: number
  context_length: number | null
  pricing?: { prompt?: string; completion?: string }
  architecture?: { modality?: string }
}

const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models"

/**
 * Fetch the public OpenRouter model catalogue (no API key required).
 * Cached via ISR for a day; throws on a non-OK response so callers can
 * fall back to the curated PLAYGROUND_MODELS list.
 */
export async function fetchOpenRouterModels(): Promise<ModelRow[]> {
  const res = await fetch(OPENROUTER_MODELS_URL, { next: { revalidate: 86400 } })
  if (!res.ok) {
    throw new Error(`OpenRouter models request failed with status ${res.status}`)
  }
  const json = (await res.json()) as { data?: RawOpenRouterModel[] }
  const rows = (json.data ?? []).map((raw): ModelRow => {
    const promptPerM = Number(raw.pricing?.prompt ?? "0") * 1_000_000
    const completionPerM = Number(raw.pricing?.completion ?? "0") * 1_000_000
    return {
      id: raw.id,
      name: raw.name,
      contextLength: raw.context_length ?? 0,
      promptPerM: Number.isFinite(promptPerM) ? promptPerM : 0,
      completionPerM: Number.isFinite(completionPerM) ? completionPerM : 0,
      modality: raw.architecture?.modality ?? "text->text",
      isFree: raw.id.endsWith(":free") || (promptPerM === 0 && completionPerM === 0),
      created: raw.created,
    }
  })
  return rows.sort((a, b) => b.created - a.created)
}

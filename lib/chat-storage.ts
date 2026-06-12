/**
 * localStorage persistence for the chat. All access goes through this module,
 * is wrapped in try/catch (private mode / blocked storage degrade to in-memory),
 * and is only called from client effects/handlers — never during render.
 * Multi-tab: last-write-wins per conversation; acceptable for v1.
 */

export interface StoredMessage {
  role: "user" | "assistant"
  content: string
}

export interface StoredConversation {
  id: string
  title: string
  model: string
  createdAt: number
  updatedAt: number
  messages: StoredMessage[]
}

interface ChatStoreV1 {
  version: 1
  conversations: StoredConversation[]
}

const STORAGE_KEY = "fable5.chat.v1"
const MAX_CONVERSATIONS = 30
const MAX_MESSAGES_PER_CONVERSATION = 200
const MAX_STORED_MESSAGE_CHARS = 24_000
const TITLE_MAX_CHARS = 60

function storageAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function isStoredMessage(value: unknown): value is StoredMessage {
  if (typeof value !== "object" || value === null) return false
  const message = value as Record<string, unknown>
  return (message.role === "user" || message.role === "assistant") && typeof message.content === "string"
}

function isStoredConversation(value: unknown): value is StoredConversation {
  if (typeof value !== "object" || value === null) return false
  const conv = value as Record<string, unknown>
  return (
    typeof conv.id === "string" &&
    typeof conv.title === "string" &&
    typeof conv.model === "string" &&
    typeof conv.createdAt === "number" &&
    typeof conv.updatedAt === "number" &&
    Array.isArray(conv.messages) &&
    conv.messages.every(isStoredMessage)
  )
}

export function loadConversations(): StoredConversation[] {
  if (!storageAvailable()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Partial<ChatStoreV1>
    if (parsed.version !== 1 || !Array.isArray(parsed.conversations)) return []
    return parsed.conversations.filter(isStoredConversation).sort((a, b) => b.updatedAt - a.updatedAt)
  } catch {
    return []
  }
}

function writeStore(conversations: StoredConversation[]): void {
  const store: ChatStoreV1 = { version: 1, conversations }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function truncateForStorage(conv: StoredConversation): StoredConversation {
  const messages = conv.messages.slice(-MAX_MESSAGES_PER_CONVERSATION).map((message) =>
    message.content.length > MAX_STORED_MESSAGE_CHARS
      ? { ...message, content: `${message.content.slice(0, MAX_STORED_MESSAGE_CHARS)}\n\n[truncated for storage]` }
      : message,
  )
  return { ...conv, messages }
}

export function saveConversation(conv: StoredConversation): void {
  if (!storageAvailable()) return
  try {
    const rest = loadConversations().filter((existing) => existing.id !== conv.id)
    const next = [truncateForStorage(conv), ...rest]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_CONVERSATIONS)
    try {
      writeStore(next)
    } catch {
      // Likely QuotaExceededError — drop the oldest conversation and retry once.
      writeStore(next.slice(0, Math.max(1, next.length - 1)))
    }
  } catch (cause) {
    console.warn("chat storage unavailable; conversation kept in memory only", cause)
  }
}

export function deleteConversation(id: string): void {
  if (!storageAvailable()) return
  try {
    writeStore(loadConversations().filter((conv) => conv.id !== id))
  } catch {
    // Ignore — worst case the item reappears next visit.
  }
}

export function deriveTitle(firstUserMessage: string): string {
  const collapsed = firstUserMessage.replace(/\s+/g, " ").trim()
  if (!collapsed) return "New chat"
  return collapsed.length > TITLE_MAX_CHARS ? `${collapsed.slice(0, TITLE_MAX_CHARS)}…` : collapsed
}

export function createConversation(model: string, firstUserMessage: string): StoredConversation {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    title: deriveTitle(firstUserMessage),
    model,
    createdAt: now,
    updatedAt: now,
    messages: [],
  }
}

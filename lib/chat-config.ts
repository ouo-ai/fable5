/** Limits and UI constants shared by the chat client and /api/chat. No secrets here. */

export const CHAT_MAX_MESSAGE_CHARS = 8000
export const CHAT_MAX_MESSAGES = 32
export const CHAT_MAX_TOTAL_CHARS = 24_000
export const CHAT_MAX_OUTPUT_TOKENS = 2048

export interface ChatMessagePayload {
  role: "user" | "assistant"
  content: string
}

export interface ChatSuggestion {
  id: string
  label: string
  prompt: string
}

export const CHAT_SUGGESTIONS: ChatSuggestion[] = [
  {
    id: "code",
    label: "Code",
    prompt: "Write a small, well-commented script that ",
  },
  {
    id: "write",
    label: "Write",
    prompt: "Draft a clear, engaging piece of writing about ",
  },
  {
    id: "learn",
    label: "Learn",
    prompt: "Explain like I'm new to the topic, with one analogy and one example: ",
  },
  {
    id: "brainstorm",
    label: "Brainstorm",
    prompt: "Brainstorm 10 distinct ideas, ranked by originality, for ",
  },
  {
    id: "analyze",
    label: "Analyze",
    prompt: "Give a structured analysis with pros, cons, and a verdict on ",
  },
]

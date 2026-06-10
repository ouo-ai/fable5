"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, SquarePen } from "lucide-react"
import { DEFAULT_MODEL_ID, isAllowedModel, type PlaygroundModel } from "../../lib/openrouter"
import { CHAT_MAX_MESSAGES, CHAT_MAX_TOTAL_CHARS } from "../../lib/chat-config"
import {
  createConversation,
  deleteConversation,
  loadConversations,
  saveConversation,
  type StoredConversation,
  type StoredMessage,
} from "../../lib/chat-storage"
import { useChatStream } from "./use-chat-stream"
import ChatSidebar from "./chat-sidebar"
import ChatThread from "./chat-thread"
import ChatComposer from "./chat-composer"
import ChatEmptyState from "./chat-empty-state"

/** Sliding window so normal UI use never trips the server's hard limits. */
function trimForApi(messages: StoredMessage[]): StoredMessage[] {
  const window: StoredMessage[] = []
  let totalChars = 0
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i]
    if (window.length > 0 && (window.length >= CHAT_MAX_MESSAGES || totalChars + message.content.length > CHAT_MAX_TOTAL_CHARS)) {
      break
    }
    window.unshift(message)
    totalChars += message.content.length
  }
  return window
}

export default function ChatApp({ models }: { models: PlaygroundModel[] }) {
  const [conversations, setConversations] = useState<StoredConversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<StoredMessage[]>([])
  const [input, setInput] = useState("")
  const [modelId, setModelId] = useState(DEFAULT_MODEL_ID)
  const [chatError, setChatError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const activeConvRef = useRef<StoredConversation | null>(null)
  const messagesRef = useRef<StoredMessage[]>([])
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // The only startup storage read — in an effect, so prerendered HTML stays stable.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe one-time client read
    setConversations(loadConversations())
  }, [])

  const persist = (nextMessages: StoredMessage[]) => {
    const conv = activeConvRef.current
    if (!conv) return
    const updated: StoredConversation = { ...conv, model: modelId, messages: nextMessages, updatedAt: Date.now() }
    activeConvRef.current = updated
    saveConversation(updated)
    setConversations((prev) => [updated, ...prev.filter((c) => c.id !== updated.id)])
  }

  const { streamText, isStreaming, start, stop } = useChatStream({
    onDone: (fullText) => {
      if (!fullText.trim()) return // Stop pressed before the first token: drop silently.
      const final = [...messagesRef.current, { role: "assistant" as const, content: fullText }]
      setMessages(final)
      persist(final)
    },
    onError: (partialText, message) => {
      if (partialText.trim()) {
        const withPartial = [...messagesRef.current, { role: "assistant" as const, content: partialText }]
        setMessages(withPartial)
        persist(withPartial)
      }
      setChatError(message)
    },
  })

  const handleSend = () => {
    const text = input.trim()
    if (!text || isStreaming) return
    setChatError(null)

    if (!activeConvRef.current) {
      const conv = createConversation(modelId, text)
      activeConvRef.current = conv
      setActiveId(conv.id)
    }

    const nextMessages = [...messages, { role: "user" as const, content: text }]
    setMessages(nextMessages)
    setInput("")
    if (textareaRef.current) textareaRef.current.style.height = "auto"
    persist(nextMessages)
    void start(trimForApi(nextMessages), modelId)
  }

  const handleRegenerate = () => {
    if (isStreaming) return
    setChatError(null)
    const base = [...messages]
    while (base.length > 0 && base[base.length - 1].role === "assistant") base.pop()
    if (base.length === 0) return
    setMessages(base)
    persist(base)
    void start(trimForApi(base), modelId)
  }

  const handleNewChat = () => {
    stop()
    activeConvRef.current = null
    setActiveId(null)
    setMessages([])
    setInput("")
    setChatError(null)
    setSidebarOpen(false)
  }

  const handleSelect = (id: string) => {
    if (id === activeId) {
      setSidebarOpen(false)
      return
    }
    stop()
    const conv = conversations.find((c) => c.id === id)
    if (!conv) return
    activeConvRef.current = conv
    setActiveId(conv.id)
    setMessages(conv.messages)
    setModelId(isAllowedModel(conv.model) ? conv.model : DEFAULT_MODEL_ID)
    setChatError(null)
    setSidebarOpen(false)
  }

  const handleDelete = (id: string) => {
    deleteConversation(id)
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (id === activeId) handleNewChat()
  }

  const handleSuggestion = (prompt: string) => {
    setInput(prompt)
    textareaRef.current?.focus()
  }

  const isEmpty = messages.length === 0 && !isStreaming
  const composer = (
    <ChatComposer
      value={input}
      onChange={setInput}
      onSend={handleSend}
      onStop={stop}
      isStreaming={isStreaming}
      models={models}
      modelId={modelId}
      onModelChange={setModelId}
      variant={isEmpty ? "hero" : "docked"}
      textareaRef={textareaRef}
    />
  )

  return (
    <div className="h-dvh flex bg-[#F7F5F3] text-[#37322F] overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden flex items-center justify-between px-3 py-2.5 border-b border-[rgba(55,50,47,0.08)]">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="flex items-center justify-center size-9 rounded-lg hover:bg-[rgba(55,50,47,0.05)]"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <span className="text-sm font-medium font-sans">fable5 chat</span>
          <button
            onClick={handleNewChat}
            aria-label="New chat"
            className="flex items-center justify-center size-9 rounded-lg hover:bg-[rgba(55,50,47,0.05)]"
          >
            <SquarePen className="size-4.5" aria-hidden="true" />
          </button>
        </div>

        {isEmpty ? (
          <ChatEmptyState onSuggestion={handleSuggestion}>{composer}</ChatEmptyState>
        ) : (
          <>
            <ChatThread
              key={activeId ?? "new"}
              messages={messages}
              streamText={streamText}
              isStreaming={isStreaming}
              error={chatError}
              onRegenerate={handleRegenerate}
              onDismissError={() => setChatError(null)}
            />
            <div className="shrink-0 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-2">
              <div className="max-w-3xl mx-auto flex flex-col gap-2">
                {composer}
                <p className="text-[11px] text-[rgba(55,50,47,0.40)] font-sans text-center">
                  Free open models via OpenRouter — not Fable 5. AI can be wrong; verify important answers.
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

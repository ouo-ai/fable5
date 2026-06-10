import type { Metadata } from "next"
import ChatApp from "../../components/chat/chat-app"
import { PLAYGROUND_MODELS } from "../../lib/openrouter"
import { siteUrl } from "../../lib/site"

export const metadata: Metadata = {
  title: "Fable 5 Chat — Free AI Chat Workspace",
  description:
    "Chat free with open-weight AI models (GPT-OSS, Kimi, Llama, Qwen, GLM) in the fable5.io workspace. Streaming answers, Markdown output, and conversations saved in your browser.",
  alternates: { canonical: `${siteUrl}/chat` },
  openGraph: {
    title: "Fable 5 Chat — Free AI Chat Workspace",
    description:
      "Chat free with open-weight AI models in the fable5.io workspace. Streaming answers, Markdown output, conversations saved in your browser.",
    url: `${siteUrl}/chat`,
  },
}

export default function ChatPage() {
  return <ChatApp models={PLAYGROUND_MODELS} />
}

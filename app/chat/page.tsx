import type { Metadata } from "next"
import ChatApp from "../../components/chat/chat-app"
import { siteUrl } from "../../lib/site"

export const metadata: Metadata = {
  title: "Fable 5 Chat — Free AI Chat Workspace",
  description:
    "Chat free with Fable 5, the fable5.io assistant powered by GPT-4o via OpenRouter. Streaming answers, Markdown output, and conversations saved in your browser.",
  alternates: { canonical: `${siteUrl}/chat` },
  openGraph: {
    title: "Fable 5 Chat — Free AI Chat Workspace",
    description:
      "Chat free with Fable 5, the fable5.io assistant powered by GPT-4o. Streaming answers, Markdown output, conversations saved in your browser.",
    url: `${siteUrl}/chat`,
  },
}

export default function ChatPage() {
  return <ChatApp />
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"
import type { StoredConversation } from "../../lib/chat-storage"

interface ChatSidebarProps {
  conversations: StoredConversation[]
  activeId: string | null
  isOpen: boolean
  onClose: () => void
  onNewChat: () => void
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export default function ChatSidebar({
  conversations,
  activeId,
  isOpen,
  onClose,
  onNewChat,
  onSelect,
  onDelete,
}: ChatSidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 md:w-64 md:static md:z-auto shrink-0 flex flex-col border-r border-[rgba(55,50,47,0.08)] bg-[#F7F5F3] transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Conversations"
      >
        <div className="flex flex-col gap-3 px-3 pt-4 pb-3">
          <Link href="/" className="flex items-center gap-2 px-1 text-[#2F3037] text-base font-medium font-sans">
            <Image
              src="/icon-192.png"
              alt=""
              width={26}
              height={26}
              className="size-[26px] rounded-[7px] border border-[rgba(55,50,47,0.10)] shadow-[0px_1px_2px_rgba(55,50,47,0.12)]"
            />
            fable5
          </Link>
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#37322F] text-white text-sm font-medium font-sans hover:bg-[#2A2520] transition-colors"
          >
            <Plus className="size-4" aria-hidden="true" />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <div className="px-1 pb-2 text-[10px] uppercase tracking-wider font-medium font-sans text-[rgba(55,50,47,0.40)]">
            Recents
          </div>
          {conversations.length === 0 ? (
            <p className="px-1 text-[12px] font-sans text-[rgba(55,50,47,0.40)]">No conversations yet</p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group flex items-center rounded-lg ${
                    conv.id === activeId
                      ? "bg-white border border-[rgba(55,50,47,0.10)] shadow-[0px_1px_3px_rgba(55,50,47,0.05)]"
                      : "hover:bg-[rgba(55,50,47,0.05)]"
                  }`}
                >
                  <button
                    onClick={() => onSelect(conv.id)}
                    className="flex-1 min-w-0 px-3 py-2 text-left text-[13px] font-sans text-[rgba(55,50,47,0.80)] truncate"
                    title={conv.title}
                  >
                    {conv.title}
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      onDelete(conv.id)
                    }}
                    aria-label={`Delete conversation: ${conv.title}`}
                    className="shrink-0 pr-2.5 pl-1 py-2 text-[rgba(55,50,47,0.45)] opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity"
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[rgba(55,50,47,0.08)] px-4 py-3 flex flex-col gap-1.5">
          <Link href="/templates" className="text-[13px] font-sans text-[rgba(73,66,61,0.70)] hover:text-[#37322F]">
            Templates
          </Link>
          <Link href="/models" className="text-[13px] font-sans text-[rgba(73,66,61,0.70)] hover:text-[#37322F]">
            Models
          </Link>
          <Link href="/" className="text-[13px] font-sans text-[rgba(73,66,61,0.70)] hover:text-[#37322F]">
            Back to fable5.io
          </Link>
        </div>
      </aside>
    </>
  )
}

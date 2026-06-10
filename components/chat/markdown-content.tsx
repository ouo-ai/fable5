"use client"

import { memo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/**
 * Assistant-message Markdown mapped to the site's design tokens.
 * No rehype-raw: raw HTML in model output stays escaped (XSS-safe by default).
 */
function MarkdownContentInner({ content }: { content: string }) {
  return (
    <div className="text-[15px] text-[#37322F] font-sans leading-relaxed flex flex-col gap-3 min-w-0 [&_p]:m-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => (
            <pre className="bg-[#FAFAF9] border border-[rgba(55,50,47,0.12)] rounded-lg p-3 text-[13px] font-mono overflow-x-auto leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            const isBlock = typeof className === "string" && className.startsWith("language-")
            if (isBlock) return <code className={className}>{children}</code>
            return (
              <code className="bg-[rgba(55,50,47,0.06)] rounded px-1 py-0.5 text-[13px] font-mono">{children}</code>
            )
          },
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-black"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc pl-5 flex flex-col gap-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 flex flex-col gap-1">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[rgba(55,50,47,0.20)] pl-3 text-[rgba(55,50,47,0.70)]">
              {children}
            </blockquote>
          ),
          h1: ({ children }) => <h1 className="text-xl font-semibold mt-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold mt-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold mt-1">{children}</h3>,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="border-collapse text-sm w-full">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-[rgba(55,50,47,0.12)] bg-[#FAFAF9] px-2.5 py-1.5 text-left font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[rgba(55,50,47,0.12)] px-2.5 py-1.5 align-top">{children}</td>
          ),
          hr: () => <hr className="border-[rgba(55,50,47,0.12)]" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

const MarkdownContent = memo(MarkdownContentInner)
export default MarkdownContent

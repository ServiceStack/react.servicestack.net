import type { ReactNode } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeExampleProps {
  title?: string
  description?: string
  code: string
  language?: string
  children: ReactNode
}

export default function CodeExample({ title, description, code, language = 'tsx', children }: CodeExampleProps) {
  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}

      {/* Code Block */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            backgroundColor: '#0f172a', // slate-900
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Live Example */}
      <div className="not-prose border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
        {children}
      </div>
    </div>
  )
}


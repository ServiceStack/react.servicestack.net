import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { MarkdownInput } from '@servicestack/react'

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.')

  return (
    <GalleryLayout title="Markdown Editor">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          The <code>&lt;MarkdownInput&gt;</code> component is a developer-friendly Markdown Editor that provides a rich 
          Markdown Textarea Input to capture rich formatted text in Markdown with icons for markdown's popular formatting 
          options and convenience keyboard bindings for a pleasant intuitive authoring experience.
        </p>

        <p>
          It's optimized for{' '}
          <a href="https://guides.github.com/features/mastering-markdown/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            GitHub Flavored Markdown
          </a>{' '}
          where it supports popular shortcuts for editing and documenting code like tab block un/indenting, 
          single-line code and comment blocks.
        </p>

        <h2>Basic Usage</h2>
        <p>
          It behaves like all other Input components which you can embed in custom UIs as a standard React Component:
        </p>
        <CodeBlock code={`import { MarkdownInput } from '@servicestack/react'

function MyComponent() {
  const [body, setBody] = useState('')

  return (
    <MarkdownInput
      id="body"
      value={body}
      onChange={setBody}
    />
  )
}`} language="tsx" />

        <h2>Component Properties</h2>
        <p>
          The MarkdownInput component offers a number of properties to customize its appearance and behavior:
        </p>
        <CodeBlock code={`interface MarkdownInputProps {
  id: string
  value?: string
  onChange?: (value: string) => void

  label?: string
  placeholder?: string
  help?: string

  rows?: number
  counter?: boolean
  disabled?: boolean

  className?: string
  labelClassName?: string

  // Hide specific toolbar buttons
  hide?: MarkdownInputOptions | MarkdownInputOptions[]
}

type MarkdownInputOptions =
  | "bold"
  | "italics"
  | "link"
  | "image"
  | "blockquote"
  | "code"
  | "heading"
  | "orderedList"
  | "unorderedList"
  | "strikethrough"
  | "undo"
  | "redo"
  | "help"`} language="typescript" />

        <h2>Using with AutoForm</h2>
        <p>
          Just like other Input components, it can be annotated on Request DTO string properties to change which Input
          component should use in AutoForm components:
        </p>
        <CodeBlock code={`public class MarkdownEmail
{
    [Input(Type="MarkdownInput", Label="")]
    [FieldCss(Field="col-span-12", Input="h-56")]
    public string? Body { get; set; }
}`} language="csharp" />

        <h2>Keyboard Shortcuts</h2>
        <p>
          For added productivity, the Editor supports many popular keyboard shortcuts found in common IDEs:
        </p>
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-4">Action</th>
                <th className="text-left py-2 px-4">Windows/Linux</th>
                <th className="text-left py-2 px-4">Mac</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 px-4">Bold</td>
                <td className="py-2 px-4"><code>Ctrl+B</code></td>
                <td className="py-2 px-4"><code>Cmd+B</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Italic</td>
                <td className="py-2 px-4"><code>Ctrl+I</code></td>
                <td className="py-2 px-4"><code>Cmd+I</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Insert Link</td>
                <td className="py-2 px-4"><code>Ctrl+K</code></td>
                <td className="py-2 px-4"><code>Cmd+K</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Code Block</td>
                <td className="py-2 px-4"><code>Ctrl+`</code></td>
                <td className="py-2 px-4"><code>Cmd+`</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Blockquote</td>
                <td className="py-2 px-4"><code>Ctrl+Q</code></td>
                <td className="py-2 px-4"><code>Cmd+Q</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Ordered List</td>
                <td className="py-2 px-4"><code>Ctrl+Shift+7</code></td>
                <td className="py-2 px-4"><code>Cmd+Shift+7</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Unordered List</td>
                <td className="py-2 px-4"><code>Ctrl+Shift+8</code></td>
                <td className="py-2 px-4"><code>Cmd+Shift+8</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Indent</td>
                <td className="py-2 px-4"><code>Tab</code></td>
                <td className="py-2 px-4"><code>Tab</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Outdent</td>
                <td className="py-2 px-4"><code>Shift+Tab</code></td>
                <td className="py-2 px-4"><code>Shift+Tab</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Undo</td>
                <td className="py-2 px-4"><code>Ctrl+Z</code></td>
                <td className="py-2 px-4"><code>Cmd+Z</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4">Redo</td>
                <td className="py-2 px-4"><code>Ctrl+Y</code></td>
                <td className="py-2 px-4"><code>Cmd+Shift+Z</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example</h2>
        <CodeExample
          title="Basic Markdown Editor"
          description="A simple markdown editor with all default features including toolbar with formatting buttons"
          code={`const [markdown, setMarkdown] = useState('# Hello World\\n\\nThis is **bold** and this is *italic*.')

<MarkdownInput
  id="markdown"
  label="Markdown Content"
  value={markdown}
  onChange={setMarkdown}
  rows={10}
  placeholder="Enter markdown here..."
/>`}
        >
          <div className="max-w-2xl">
            <MarkdownInput
              id="markdown"
              label="Markdown Content"
              value={markdown}
              onChange={setMarkdown}
              rows={10}
              placeholder="Enter markdown here..."
            />
          </div>
        </CodeExample>
      </div>
    </GalleryLayout>
  )
}


import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CodeBlock from './CodeBlock'

describe('CodeBlock', () => {
  it('should render code content', () => {
    const code = 'const hello = "world";'
    const { container } = render(<CodeBlock code={code} />)
    const codeElement = container.querySelector('code')
    expect(codeElement).toBeInTheDocument()
    expect(codeElement?.textContent).toContain('const')
    expect(codeElement?.textContent).toContain('hello')
  })

  it('should use tsx as default language', () => {
    const code = 'const test = 123;'
    const { container } = render(<CodeBlock code={code} />)
    const pre = container.querySelector('pre')
    expect(pre).toBeInTheDocument()
  })

  it('should accept custom language', () => {
    const code = 'print("hello")'
    const { container } = render(<CodeBlock code={code} language="python" />)
    const pre = container.querySelector('pre')
    expect(pre).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const code = 'test'
    const customClass = 'my-custom-class'
    const { container } = render(<CodeBlock code={code} className={customClass} />)
    expect(container.firstChild).toHaveClass(customClass)
  })

  it('should render multiline code', () => {
    const code = `function test() {
  return true;
}`
    const { container } = render(<CodeBlock code={code} />)
    const codeElement = container.querySelector('code')
    expect(codeElement?.textContent).toContain('function')
    expect(codeElement?.textContent).toContain('test')
    expect(codeElement?.textContent).toContain('return')
    expect(codeElement?.textContent).toContain('true')
  })

  it('should handle empty code', () => {
    const { container } = render(<CodeBlock code="" />)
    expect(container.querySelector('code')).toBeInTheDocument()
  })

  it('should handle special characters in code', () => {
    const code = 'const str = "<div>&nbsp;</div>";'
    const { container } = render(<CodeBlock code={code} />)
    const codeElement = container.querySelector('code')
    expect(codeElement?.textContent).toContain('const')
    expect(codeElement?.textContent).toContain('str')
  })
})


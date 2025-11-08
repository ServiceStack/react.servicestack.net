import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import GalleryLayout from './GalleryLayout'

// Mock the DarkModeToggle component from @servicestack/react
vi.mock('@servicestack/react', () => ({
  DarkModeToggle: () => <div data-testid="dark-mode-toggle">Dark Mode Toggle</div>
}))

describe('GalleryLayout', () => {
  beforeEach(() => {
    // Reset window.location.pathname before each test
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true,
    })
  })

  it('should render children content', () => {
    render(
      <GalleryLayout>
        <div>Test Content</div>
      </GalleryLayout>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render title when provided', () => {
    render(
      <GalleryLayout title="Test Title">
        <div>Content</div>
      </GalleryLayout>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should not render title when not provided', () => {
    const { container } = render(
      <GalleryLayout>
        <div>Content</div>
      </GalleryLayout>
    )
    const h1 = container.querySelector('h1')
    expect(h1).toBeNull()
  })

  it('should render header with logo and site name', () => {
    render(<GalleryLayout><div>Content</div></GalleryLayout>)
    expect(screen.getByText('React Component Gallery')).toBeInTheDocument()
  })

  it('should render React logo SVG', () => {
    const { container } = render(<GalleryLayout><div>Content</div></GalleryLayout>)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('w-8', 'h-8', 'text-[#61DAFB]')
  })

  it('should render DarkModeToggle', () => {
    render(<GalleryLayout><div>Content</div></GalleryLayout>)
    expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument()
  })

  it('should render navigation sidebar', () => {
    render(<GalleryLayout><div>Content</div></GalleryLayout>)
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
    expect(screen.getByText('Component Gallery')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('should render all navigation links', () => {
    render(<GalleryLayout><div>Content</div></GalleryLayout>)
    
    // Getting Started
    expect(screen.getByText('Installation')).toBeInTheDocument()
    
    // Component Gallery
    expect(screen.getByText('AutoQueryGrid')).toBeInTheDocument()
    expect(screen.getByText('DataGrid')).toBeInTheDocument()
    expect(screen.getByText('Auto Forms')).toBeInTheDocument()
    expect(screen.getByText('FileInput')).toBeInTheDocument()
    expect(screen.getByText('TagInput')).toBeInTheDocument()
    expect(screen.getByText('Combobox')).toBeInTheDocument()
    expect(screen.getByText('Autocomplete')).toBeInTheDocument()
    expect(screen.getByText('Markdown Editor')).toBeInTheDocument()
    
    // Library
    expect(screen.getByText('useMetadata')).toBeInTheDocument()
    expect(screen.getByText('useClient')).toBeInTheDocument()
    expect(screen.getByText('useAuth')).toBeInTheDocument()
  })

  it('should highlight active link based on current path', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/gallery/autoquerygrid' },
      writable: true,
    })

    const { container } = render(<GalleryLayout><div>Content</div></GalleryLayout>)
    const activeLink = container.querySelector('a[href="/gallery/autoquerygrid"]')
    
    expect(activeLink).toHaveClass('text-indigo-600', 'dark:text-indigo-400', 'font-semibold')
  })

  it('should apply hover styles to non-active links', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true,
    })

    const { container } = render(<GalleryLayout><div>Content</div></GalleryLayout>)
    const link = container.querySelector('a[href="/gallery/autoquerygrid"]')
    
    expect(link).toHaveClass('text-gray-700', 'dark:text-gray-300')
  })

  it('should have correct link hrefs', () => {
    const { container } = render(<GalleryLayout><div>Content</div></GalleryLayout>)
    
    const installLink = container.querySelector('a[href="/gallery/install"]')
    expect(installLink).toBeInTheDocument()
    
    const autoQueryLink = container.querySelector('a[href="/gallery/autoquerygrid"]')
    expect(autoQueryLink).toBeInTheDocument()
    
    const useMetadataLink = container.querySelector('a[href="/gallery/use-metadata"]')
    expect(useMetadataLink).toBeInTheDocument()
  })

  it('should render main content area with prose styling', () => {
    const { container } = render(
      <GalleryLayout>
        <div>Test Content</div>
      </GalleryLayout>
    )
    
    const main = container.querySelector('main')
    expect(main).toHaveClass('prose', 'prose-slate', 'dark:prose-invert')
  })

  it('should have responsive layout classes', () => {
    const { container } = render(<GalleryLayout><div>Content</div></GalleryLayout>)
    
    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('hidden', 'lg:block')
  })
})


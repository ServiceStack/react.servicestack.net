import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('should render the app', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('should display initial count of 0', () => {
    render(<App />)
    expect(screen.getByRole('button')).toHaveTextContent('count is 0')
  })

  it('should increment count when button is clicked', () => {
    render(<App />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('count is 1')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('count is 2')
  })

  it('should render Vite logo', () => {
    render(<App />)
    const viteLogo = screen.getByAltText('Vite logo')
    expect(viteLogo).toBeInTheDocument()
    expect(viteLogo).toHaveAttribute('src')
  })

  it('should render React logo', () => {
    render(<App />)
    const reactLogo = screen.getByAltText('React logo')
    expect(reactLogo).toBeInTheDocument()
  })

  it('should have links to documentation', () => {
    render(<App />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', 'https://vite.dev')
    expect(links[1]).toHaveAttribute('href', 'https://react.dev')
  })

  it('should display HMR message', () => {
    render(<App />)
    expect(screen.getByText(/Edit/)).toBeInTheDocument()
    expect(screen.getByText(/src\/App.tsx/)).toBeInTheDocument()
  })
})


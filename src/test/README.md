# Testing Guide

This project uses [Vitest](https://vitest.dev/) for unit testing React components and utility functions.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are located alongside the files they test:
- `src/App.test.tsx` - Tests for the main App component
- `src/gallery/data.test.ts` - Tests for data utilities and fixtures
- `src/gallery/components/CodeBlock.test.tsx` - Tests for CodeBlock component
- `src/gallery/components/GalleryLayout.test.tsx` - Tests for GalleryLayout component

## Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Utility Function Tests

```typescript
import { describe, it, expect } from 'vitest'
import { myUtility } from './utils'

describe('myUtility', () => {
  it('should return expected value', () => {
    expect(myUtility('input')).toBe('output')
  })
})
```

## Test Coverage

Current test coverage includes:
- ✅ App component (7 tests)
- ✅ Data utilities and fixtures (23 tests)
- ✅ CodeBlock component (7 tests)
- ✅ GalleryLayout component (13 tests)

**Total: 50 tests**

## Dependencies

- `vitest` - Test runner
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - Custom matchers for DOM assertions
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM implementation for Node.js
- `@vitest/ui` - UI for viewing test results
- `happy-dom` - Alternative DOM implementation (optional)


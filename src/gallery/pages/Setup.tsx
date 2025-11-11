import React from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function SetupPage() {
  return (
    <GalleryLayout title="Setup Examples">
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Learn how to configure @servicestack/react for different frameworks and routing solutions.
        </p>

        <h2>React Router Setup</h2>
        <p>
          For applications using React Router (Vite, Create React App, etc.), configure the library to use React Router's Link component:
        </p>
        <CodeBlock code={`import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link } from 'react-router-dom'
import { setLinkComponent } from '@servicestack/react'
import App from './App'

// Configure the library to use React Router's Link component
setLinkComponent(Link)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)`} language="tsx" />

        <h2>Next.js App Router Setup</h2>
        <p>
          For Next.js 13+ applications using the App Router, configure the library in your root layout:
        </p>
        <CodeBlock code={`'use client'

import Link from 'next/link'
import { setLinkComponent } from '@servicestack/react'

// Configure the library to use Next.js Link component
setLinkComponent(Link)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`} language="tsx" />

        <h2>Next.js Pages Router Setup</h2>
        <p>
          For Next.js applications using the Pages Router, configure the library in your _app.tsx:
        </p>
        <CodeBlock code={`import type { AppProps } from 'next/app'
import Link from 'next/link'
import { setLinkComponent } from '@servicestack/react'

// Configure the library to use Next.js Link component
setLinkComponent(Link)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}`} language="tsx" />

        <h2>No Router Setup</h2>
        <p>
          For applications without a routing library, no configuration is needed. The library will automatically use standard anchor tags:
        </p>
        <CodeBlock code={`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// No router configuration needed!
// Navigation components will use standard <a> tags

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`} language="tsx" />

        <h2>How It Works</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-4">
          <h3 className="mt-0 text-blue-900 dark:text-blue-100">Smart URL Detection</h3>
          <p className="mb-0">
            The library automatically detects external URLs (http://, https://, mailto:, tel:) and uses plain anchor tags for them,
            while internal URLs use your configured Link component for client-side navigation.
          </p>
        </div>

        <h3>Internal Navigation</h3>
        <p>Uses your configured Link component (or anchor tags if none configured):</p>
        <CodeBlock code={`<PrimaryButton href="/dashboard">Dashboard</PrimaryButton>
<Breadcrumb href="/products">Products</Breadcrumb>
<TextLink href="/about">About Us</TextLink>`} language="tsx" />

        <h3>External URLs</h3>
        <p>Automatically uses plain anchor tags (no configuration needed):</p>
        <CodeBlock code={`<PrimaryButton href="https://docs.servicestack.net">Documentation</PrimaryButton>
<TextLink href="mailto:support@example.com">Email Support</TextLink>
<SecondaryButton href="tel:+1234567890">Call Us</SecondaryButton>`} language="tsx" />

        <h2>Benefits</h2>
        <ul>
          <li>✅ <strong>Framework Agnostic</strong> - Works with React Router, Next.js, or plain React</li>
          <li>✅ <strong>React 19 Compatible</strong> - No SSR issues with React 19</li>
          <li>✅ <strong>Smart URL Detection</strong> - Automatically handles external vs internal URLs</li>
          <li>✅ <strong>Zero Configuration</strong> - Works out of the box without any routing library</li>
          <li>✅ <strong>Type Safe</strong> - Full TypeScript support</li>
          <li>✅ <strong>Smaller Bundles</strong> - Optional dependencies reduce bundle size</li>
        </ul>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
          <h3 className="mt-0 text-yellow-900 dark:text-yellow-100">Note</h3>
          <p className="mb-0">
            If you don't call <code>setLinkComponent()</code>, all navigation components will use standard anchor tags.
            This is perfectly fine for server-rendered apps or apps without client-side routing!
          </p>
        </div>
      </div>
    </GalleryLayout>
  )
}


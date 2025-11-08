import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function UseConfigPage() {
  return (
    <GalleryLayout title="useConfig Hook">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          <code>useConfig()</code> is used to maintain global configuration that's used throughout the React Component Library.
        </p>

        <h2>Available Functions</h2>
        <CodeBlock code={`import { useConfig } from "@servicestack/react"

const {
  config,                   // Resolve configuration
  setConfig,                // Set global configuration
  assetsPathResolver,       // Resolve Absolute URL to use for relative paths
  fallbackPathResolver,     // Resolve fallback URL to use if primary URL fails
  autoQueryGridDefaults,    // Resolve AutoQueryGrid default configuration
  setAutoQueryGridDefaults, // Set AutoQueryGrid default configuration
} = useConfig()`} language="typescript" />

        <p>
          The asset and fallback URL resolvers are useful when hosting assets on a separate CDN from the hosted website.
        </p>

        <h2>Default Configuration</h2>
        <CodeBlock code={`import { setConfig } from "@servicestack/react"

setConfig({
  redirectSignIn: '/signin',
  assetsPathResolver: src => src,
  fallbackPathResolver: src => src,
})`} language="typescript" />

        <h2>AutoQueryGrid Defaults</h2>
        <p>
          Use <code>setAutoQueryGridDefaults</code> to change the default configuration for all{' '}
          <a href="/gallery/autoquerygrid" className="text-blue-600 dark:text-blue-400 hover:underline">AutoQueryGrid</a> components:
        </p>
        <CodeBlock code={`import { setAutoQueryGridDefaults } from "@servicestack/react"

setAutoQueryGridDefaults({
  deny: [],
  hide: [],
  toolbarButtonClass: undefined,
  tableStyle: "stripedRows",
  take: 25,
  maxFieldLength: 150,
})`} language="typescript" />

        <h3>Available Options</h3>
        <CodeBlock code={`type AutoQueryGridDefaults = {
  deny?: GridAllowOptions[]
  hide?: GridShowOptions[]
  toolbarButtonClass?: string
  tableStyle?: TableStyleOptions
  take?: number
  maxFieldLength?: number
}

type GridAllowOptions = 
  | "filtering" 
  | "queryString" 
  | "queryFilters"

type GridShowOptions = 
  | "toolbar" 
  | "preferences" 
  | "pagingNav" 
  | "pagingInfo" 
  | "downloadCsv" 
  | "refresh" 
  | "copyApiUrl" 
  | "resetPreferences" 
  | "filtersView" 
  | "newItem"

type TableStyleOptions = 
  | "stripedRows" 
  | "whiteBackground" 
  | "verticalLines" 
  | "fullWidth"`} language="typescript" />

        <h2>Usage Examples</h2>

        <h3>Custom Asset Path Resolver</h3>
        <CodeBlock code={`import { setConfig } from "@servicestack/react"

// Host assets on a CDN
setConfig({
  assetsPathResolver: (src) => {
    if (src.startsWith('http')) return src
    return \`https://cdn.example.com\${src}\`
  }
})`} language="typescript" />

        <h3>Fallback Path Resolver</h3>
        <CodeBlock code={`import { setConfig } from "@servicestack/react"

// Provide fallback for broken images
setConfig({
  fallbackPathResolver: (src) => {
    return '/images/placeholder.png'
  }
})`} language="typescript" />

        <h3>Custom Sign-In Redirect</h3>
        <CodeBlock code={`import { setConfig } from "@servicestack/react"

setConfig({
  redirectSignIn: '/auth/login'
})`} language="typescript" />

        <h3>Global AutoQueryGrid Configuration</h3>
        <CodeBlock code={`import { setAutoQueryGridDefaults } from "@servicestack/react"

// Hide toolbar and set default page size
setAutoQueryGridDefaults({
  hide: ['toolbar'],
  take: 50,
  tableStyle: 'verticalLines',
  maxFieldLength: 200,
})`} language="typescript" />

        <h3>Disable Features Globally</h3>
        <CodeBlock code={`import { setAutoQueryGridDefaults } from "@servicestack/react"

// Disable filtering and query string features
setAutoQueryGridDefaults({
  deny: ['filtering', 'queryString'],
  hide: ['downloadCsv', 'copyApiUrl'],
})`} language="typescript" />

        <h2>TypeScript Definition</h2>
        <CodeBlock code={`interface UiConfig {
  redirectSignIn?: string
  assetsPathResolver?: (src: string) => string
  fallbackPathResolver?: (src: string) => string
}

/** Resolve configuration */
const config: UiConfig

/** Set global configuration */
function setConfig(config: UiConfig): void;

/** Resolve Absolute URL to use for relative paths */
function assetsPathResolver(src?: string): string | undefined;

/** Resolve fallback URL to use if primary URL fails */
function fallbackPathResolver(src?: string): string | undefined;

/** Resolve AutoQueryGrid default configuration */
function autoQueryGridDefaults(): AutoQueryGridDefaults;

/** Set AutoQueryGrid default configuration */
function setAutoQueryGridDefaults(defaults: AutoQueryGridDefaults): void;`} language="typescript" />
      </div>
    </GalleryLayout>
  )
}


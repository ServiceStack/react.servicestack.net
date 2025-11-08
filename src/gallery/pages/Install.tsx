import { useState, useMemo } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

function ProjectTemplateSelector() {
  const [project, setProject] = useState('MyApp')

  const projectZip = useMemo(() => (project || 'MyApp') + '.zip', [project])

  const zipUrl = (template: string) =>
    `https://account.servicestack.net/archive/${template}?Name=${project || 'MyApp'}`

  const isAlphaNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key
    // Allow alphanumeric characters and underscore
    if (key.length === 1 && !/^[A-Za-z0-9_]$/.test(key)) {
      e.preventDefault()
    }
  }

  return (
    <section className="not-prose w-full flex flex-col justify-center text-center">
      <div id="empty" className="mt-4 mb-2">
        <div className="flex justify-center mb-16">
          <div className="w-70">
            <input
              value={project}
              onChange={(e) => setProject(e.target.value)}
              type="text"
              placeholder="Project Name"
              autoCorrect="off"
              spellCheck={false}
              onKeyDown={isAlphaNumeric}
              className="mt-1 text-lg block w-full px-3 py-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400
                         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
        <div id="ssg" className="mt-4 mb-2">
          <h3 className="text-gray-400 text-xl mb-2">React Templates</h3>
          <div className="flex flex-wrap justify-center">
            <div>
              <a className="archive-url hover:no-underline" href={zipUrl('NetCoreTemplates/react-vite')}>
                <div className="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style={{ minWidth: '150px' }}>
                  <div className="text-center font-extrabold flex items-center justify-center mb-2">
                    <div className="text-4xl text-blue-400 my-3">
                      <svg className="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="-10.5 -9.45 21 18.9" fill="none">
                        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                        <g stroke="currentColor" strokeWidth="1" fill="none">
                          <ellipse rx="10" ry="4.5"></ellipse>
                          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="text-xl font-medium text-gray-700 dark:text-gray-200">React Vite</div>
                  <div className="flex justify-center h-8"></div>
                  <span className="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{projectZip}</span>
                  <div className="count mt-1 text-gray-400 text-sm"></div>
                </div>
              </a>
              <a className="text-sm text-center mr-4" href="https://react-vite.web-templates.io">react-vite.web-templates.io</a>
            </div>
            <div>
              <a className="archive-url hover:no-underline" href={zipUrl('NetCoreTemplates/nextjs')}>
                <div className="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style={{ minWidth: '150px' }}>
                  <div className="text-center font-extrabold flex items-center justify-center mb-2">
                    <div className="text-4xl text-blue-400 my-3">
                      <svg className="w-14 h-14 bg-white text-gray-900 rounded-full" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M386.399 35.508C217.06-64.061 1.885 57.55.012 253.882c-1.828 191.716 201.063 315.545 370.02 231.163L185.56 213.636v167.997c0 18.614-35.619 18.614-35.619 0V156.421c0-14.776 27.448-15.989 35.226-3.145L395.43 470.572c157.95-101.737 155.817-338.136-9.031-435.064zm-23.756 317.939L326.91 298.87V149.458c0-13.932 35.732-13.932 35.732 0v203.989z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-xl font-medium text-gray-700 dark:text-gray-200">Next.js</div>
                  <div className="flex justify-center h-8"></div>
                  <span className="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{projectZip}</span>
                  <div className="count mt-1 text-gray-400 text-sm"></div>
                </div>
              </a>
              <a className="text-sm text-center mr-4" href="https://nextjs.web-templates.io">nextjs.web-templates.io</a>
            </div>
            <div>
              <a className="archive-url hover:no-underline" href={zipUrl('NetCoreTemplates/react-spa')}>
                <div className="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style={{ minWidth: '150px' }}>
                  <div className="text-center font-extrabold flex items-center justify-center mb-2">
                    <div className="text-4xl text-blue-400 my-3">
                      <svg className="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="-10.5 -9.45 21 18.9" fill="none">
                        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                        <g stroke="currentColor" strokeWidth="1" fill="none">
                          <ellipse rx="10" ry="4.5"></ellipse>
                          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="text-xl font-medium text-gray-700 dark:text-gray-200">React SPA</div>
                  <div className="flex justify-center h-8"></div>
                  <span className="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{projectZip}</span>
                  <div className="count mt-1 text-gray-400 text-sm"></div>
                </div>
              </a>
              <a className="text-sm text-center mr-4" href="https://react-spa.web-templates.io">react-spa.web-templates.io</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function InstallPage() {
  return (
    <GalleryLayout title="Installation">
      <h2>Starting Project Templates</h2>
      <p>
        The fastest way to get started is to use one of our pre-configured project templates.
        These templates come with ServiceStack and <code>@servicestack/react</code> already configured with
        best practices, authentication, and example components to help you hit the ground running.
      </p>

      <ProjectTemplateSelector />

      <h2>NPM Installation</h2>
        <p>
          <strong>@servicestack/react</strong> can be added to existing React Apps by installing via npm:
        </p>
        <CodeBlock code="npm install @servicestack/react" language="bash" />
        <p>
          Where it will also install its <strong>react</strong> and <strong>@servicestack/client</strong> dependencies.
        </p>

        <h2>Setup</h2>
        <p>
          Then register the <code>@servicestack/react</code> component library with your React app:
        </p>
        <CodeBlock code={`import { JsonServiceClient } from "@servicestack/client"
import { ClientContext } from "@servicestack/react"

const client = new JsonServiceClient()

function App() {
  return (
    <ClientContext.Provider value={client}>
      {/* Your app components */}
    </ClientContext.Provider>
  )
}`} language="tsx" />

        <h2>API Configuration</h2>
        <p>
          The <strong>client</strong> instance is used by API-enabled components to call your APIs.
          Configure the base URL for your ServiceStack backend:
        </p>
        <CodeBlock code={`const client = new JsonServiceClient('https://api.example.com')`} language="typescript" />

        <h2>TypeScript DTOs</h2>
        <p>
          Generate TypeScript DTOs from your ServiceStack services to get full type safety:
        </p>
        <CodeBlock code={`# Add TypeScript reference to your ServiceStack instance
npx @servicestack/cli add https://api.example.com

# Update DTOs when your services change
npx @servicestack/cli update`} language="bash" />

        <h2>Tailwind CSS</h2>
        <p>
          The component library uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project:
        </p>
        <CodeBlock code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`} language="bash" />

        <p>
          Configure your <code>tailwind.config.js</code> to include the component library:
        </p>
        <CodeBlock code={`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@servicestack/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`} language="javascript" />

        <h2>Dark Mode Support</h2>
        <p>
          All components support dark mode out of the box. Enable dark mode in your Tailwind config:
        </p>
        <CodeBlock code={`/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media'
  // ... rest of config
}`} language="javascript" />

        <h2>Quick Start Example</h2>
        <p>
          Here's a complete example to get you started:
        </p>
        <CodeBlock code={`import React from 'react'
import { JsonServiceClient } from '@servicestack/client'
import { ClientContext, AutoQueryGrid } from '@servicestack/react'

const client = new JsonServiceClient('https://blazor-gallery.web-templates.io')

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My App</h1>
        <AutoQueryGrid type="QueryBookings" />
      </div>
    </ClientContext.Provider>
  )
}

export default App`} language="tsx" />

        <h2>Next Steps</h2>
        <p>
          Explore the component gallery to see all available components and their usage:
        </p>
        <ul>
          <li><a href="/gallery/autoquerygrid" className="text-blue-600 dark:text-blue-400 hover:underline">AutoQueryGrid</a> - Queryable data grids with CRUD operations</li>
          <li><a href="/gallery/autoform" className="text-blue-600 dark:text-blue-400 hover:underline">Auto Forms</a> - Automatic form generation from DTOs</li>
          <li><a href="/gallery/form-inputs" className="text-blue-600 dark:text-blue-400 hover:underline">Form Inputs</a> - Rich form input components</li>
          <li><a href="/gallery/use-client" className="text-blue-600 dark:text-blue-400 hover:underline">useClient</a> - API client hook</li>
          <li><a href="/gallery/use-metadata" className="text-blue-600 dark:text-blue-400 hover:underline">useMetadata</a> - Metadata utilities</li>
        </ul>
    </GalleryLayout>
  )
}


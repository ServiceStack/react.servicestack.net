import type { ReactNode } from 'react'
import { DarkModeToggle } from '@servicestack/react'

interface GalleryLayoutProps {
  children: ReactNode
  title?: string
}

export default function GalleryLayout({ children, title }: GalleryLayoutProps) {
  const currentPath = window.location.pathname

  const getLinkClass = (href: string) => {
    const isActive = currentPath === href
    return `text-sm block py-1 ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
    }`
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="px-2 sm:px-3 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <a href="/gallery" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                React Component Gallery
              </a>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 min-h-screen">
          <nav className="sticky top-0 p-6 space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Getting Started
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/gallery/install" className={getLinkClass('/gallery/install')}>
                    Installation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Component Gallery
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/gallery/autoquerygrid" className={getLinkClass('/gallery/autoquerygrid')}>
                    AutoQueryGrid
                  </a>
                </li>
                <li>
                  <a href="/gallery/datagrid" className={getLinkClass('/gallery/datagrid')}>
                    DataGrid
                  </a>
                </li>
                <li>
                  <a href="/gallery/autoform" className={getLinkClass('/gallery/autoform')}>
                    Auto Forms
                  </a>
                </li>
                <li>
                  <a href="/gallery/custom-autoforms" className={getLinkClass('/gallery/custom-autoforms')}>
                    Custom Auto Forms
                  </a>
                </li>
                <li>
                  <a href="/gallery/form-inputs" className={getLinkClass('/gallery/form-inputs')}>
                    Form Inputs
                  </a>
                </li>
                <li>
                  <a href="/gallery/fileinput" className={getLinkClass('/gallery/fileinput')}>
                    FileInput
                  </a>
                </li>
                <li>
                  <a href="/gallery/taginput" className={getLinkClass('/gallery/taginput')}>
                    TagInput
                  </a>
                </li>
                <li>
                  <a href="/gallery/combobox" className={getLinkClass('/gallery/combobox')}>
                    Combobox
                  </a>
                </li>
                <li>
                  <a href="/gallery/autocomplete" className={getLinkClass('/gallery/autocomplete')}>
                    Autocomplete
                  </a>
                </li>
                <li>
                  <a href="/gallery/markdown" className={getLinkClass('/gallery/markdown')}>
                    Markdown Editor
                  </a>
                </li>
                <li>
                  <a href="/gallery/custom-inputs" className={getLinkClass('/gallery/custom-inputs')}>
                    Custom Inputs
                  </a>
                </li>
                <li>
                  <a href="/gallery/modals" className={getLinkClass('/gallery/modals')}>
                    Modals
                  </a>
                </li>
                <li>
                  <a href="/gallery/navigation" className={getLinkClass('/gallery/navigation')}>
                    Navigation
                  </a>
                </li>
                <li>
                  <a href="/gallery/alerts" className={getLinkClass('/gallery/alerts')}>
                    Alerts
                  </a>
                </li>
                <li>
                  <a href="/gallery/formats" className={getLinkClass('/gallery/formats')}>
                    Formats
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Library
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/gallery/use-metadata" className={getLinkClass('/gallery/use-metadata')}>
                    useMetadata
                  </a>
                </li>
                <li>
                  <a href="/gallery/use-client" className={getLinkClass('/gallery/use-client')}>
                    useClient
                  </a>
                </li>
                <li>
                  <a href="/gallery/use-auth" className={getLinkClass('/gallery/use-auth')}>
                    useAuth
                  </a>
                </li>
                <li>
                  <a href="/gallery/use-formatters" className={getLinkClass('/gallery/use-formatters')}>
                    useFormatters
                  </a>
                </li>
                <li>
                  <a href="/gallery/use-files" className={getLinkClass('/gallery/use-files')}>
                    useFiles
                  </a>
                </li>
                <li>
                  <a href="/gallery/use-utils" className={getLinkClass('/gallery/use-utils')}>
                    useUtils
                  </a>
                </li>
                <li>
                  <a href="/gallery/use-config" className={getLinkClass('/gallery/use-config')}>
                    useConfig
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-x-auto prose prose-slate dark:prose-invert max-w-none">
          {title && (
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              {title}
            </h1>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}


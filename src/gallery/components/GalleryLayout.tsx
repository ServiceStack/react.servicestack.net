import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DarkModeToggle } from '@servicestack/react'

interface GalleryLayoutProps {
  children: ReactNode
  title?: string
}

export default function GalleryLayout({ children, title }: GalleryLayoutProps) {
  const location = useLocation()
  const currentPath = location.pathname

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
            <div className="flex items-center gap-2">
              <Link to="/">
                <svg className="w-8 h-8 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                  </g>
                </svg>
              </Link>
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                React Component Gallery
              </Link>
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
                  <Link to="/gallery/install" className={getLinkClass('/gallery/install')}>
                    Installation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Component Gallery
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/gallery/autoquerygrid" className={getLinkClass('/gallery/autoquerygrid')}>
                    AutoQueryGrid
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/datagrid" className={getLinkClass('/gallery/datagrid')}>
                    DataGrid
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/autoform" className={getLinkClass('/gallery/autoform')}>
                    Auto Forms
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/custom-autoforms" className={getLinkClass('/gallery/custom-autoforms')}>
                    Custom Auto Forms
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/form-inputs" className={getLinkClass('/gallery/form-inputs')}>
                    Form Inputs
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/fileinput" className={getLinkClass('/gallery/fileinput')}>
                    FileInput
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/taginput" className={getLinkClass('/gallery/taginput')}>
                    TagInput
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/combobox" className={getLinkClass('/gallery/combobox')}>
                    Combobox
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/autocomplete" className={getLinkClass('/gallery/autocomplete')}>
                    Autocomplete
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/markdown" className={getLinkClass('/gallery/markdown')}>
                    Markdown Editor
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/custom-inputs" className={getLinkClass('/gallery/custom-inputs')}>
                    Custom Inputs
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/modals" className={getLinkClass('/gallery/modals')}>
                    Modals
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/navigation" className={getLinkClass('/gallery/navigation')}>
                    Navigation
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/alerts" className={getLinkClass('/gallery/alerts')}>
                    Alerts
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/formats" className={getLinkClass('/gallery/formats')}>
                    Formats
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Library
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/gallery/use-metadata" className={getLinkClass('/gallery/use-metadata')}>
                    useMetadata
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/use-client" className={getLinkClass('/gallery/use-client')}>
                    useClient
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/use-auth" className={getLinkClass('/gallery/use-auth')}>
                    useAuth
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/use-formatters" className={getLinkClass('/gallery/use-formatters')}>
                    useFormatters
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/use-files" className={getLinkClass('/gallery/use-files')}>
                    useFiles
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/use-utils" className={getLinkClass('/gallery/use-utils')}>
                    useUtils
                  </Link>
                </li>
                <li>
                  <Link to="/gallery/use-config" className={getLinkClass('/gallery/use-config')}>
                    useConfig
                  </Link>
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


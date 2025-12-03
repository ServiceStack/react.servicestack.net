import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { GalleryProvider } from './gallery/context'
import { trackPageView } from './analytics'
import Gallery from './gallery'
import AlertsPage from './gallery/pages/Alerts'
import DataGridPage from './gallery/pages/DataGrid'
import ModalsPage from './gallery/pages/Modals'
import FormatsPage from './gallery/pages/Formats'
import AutoQueryGridPage from './gallery/pages/AutoQueryGrid'
import AutoFormPage from './gallery/pages/AutoForm'
import FormInputsPage from './gallery/pages/FormInputs'
import FileInputPage from './gallery/pages/FileInput'
import TagInputPage from './gallery/pages/TagInput'
import ComboboxPage from './gallery/pages/Combobox'
import AutocompletePage from './gallery/pages/Autocomplete'
import NavigationPage from './gallery/pages/Navigation'
import UseMetadataPage from './gallery/pages/UseMetadata'
import UseClientPage from './gallery/pages/UseClient'
import UseAuthPage from './gallery/pages/UseAuth'
import UseFormattersPage from './gallery/pages/UseFormatters'
import UseFilesPage from './gallery/pages/UseFiles'
import UseUtilsPage from './gallery/pages/UseUtils'
import UseConfigPage from './gallery/pages/UseConfig'
import InstallPage from './gallery/pages/Install'
import CustomAutoFormsPage from './gallery/pages/CustomAutoForms'
import MarkdownEditorPage from './gallery/pages/MarkdownEditor'
import CustomInputsPage from './gallery/pages/CustomInputs'
import SetupPage from './gallery/pages/Setup'
import './index.css'

// Initialize dark mode from localStorage
const colorScheme = localStorage.getItem('color-scheme')
console.log('Initial color-scheme from localStorage:', colorScheme)
console.log('HTML classList before:', document.documentElement.classList.toString())

if (colorScheme === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

console.log('HTML classList after:', document.documentElement.classList.toString())

// Analytics component to track page views
function Analytics() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GalleryProvider>
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/autoquerygrid" element={<AutoQueryGridPage />} />
          <Route path="/gallery/datagrid" element={<DataGridPage />} />
          <Route path="/gallery/autoform" element={<AutoFormPage />} />
          <Route path="/gallery/form-inputs" element={<FormInputsPage />} />
          <Route path="/gallery/fileinput" element={<FileInputPage />} />
          <Route path="/gallery/taginput" element={<TagInputPage />} />
          <Route path="/gallery/combobox" element={<ComboboxPage />} />
          <Route path="/gallery/autocomplete" element={<AutocompletePage />} />
          <Route path="/gallery/modals" element={<ModalsPage />} />
          <Route path="/gallery/navigation" element={<NavigationPage />} />
          <Route path="/gallery/alerts" element={<AlertsPage />} />
          <Route path="/gallery/formats" element={<FormatsPage />} />
          <Route path="/gallery/use-metadata" element={<UseMetadataPage />} />
          <Route path="/gallery/use-client" element={<UseClientPage />} />
          <Route path="/gallery/use-auth" element={<UseAuthPage />} />
          <Route path="/gallery/use-formatters" element={<UseFormattersPage />} />
          <Route path="/gallery/use-files" element={<UseFilesPage />} />
          <Route path="/gallery/use-utils" element={<UseUtilsPage />} />
          <Route path="/gallery/use-config" element={<UseConfigPage />} />
          <Route path="/gallery/install" element={<InstallPage />} />
          <Route path="/gallery/custom-autoforms" element={<CustomAutoFormsPage />} />
          <Route path="/gallery/markdown" element={<MarkdownEditorPage />} />
          <Route path="/gallery/custom-inputs" element={<CustomInputsPage />} />
        <Route path="/gallery/setup" element={<SetupPage />} />
        </Routes>
      </BrowserRouter>
    </GalleryProvider>
  </React.StrictMode>,
)

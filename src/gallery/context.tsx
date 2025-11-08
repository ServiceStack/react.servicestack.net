import type { ReactNode } from 'react'
import { JsonServiceClient } from '@servicestack/client'
import { ClientContext, authContext, useMetadata } from '@servicestack/react'

// Create a JsonServiceClient instance for the gallery
const client = new JsonServiceClient('https://blazor-gallery.servicestack.net')

// Load metadata using useMetadata hook
const { loadMetadata } = useMetadata(client)
loadMetadata()

// Authenticate on load
const authCts = authContext()
fetch('https://blazor-gallery.servicestack.net/auth/credentials', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ provider: 'credentials', userName: 'admin@email.com', password: 'p@55wOrd' }),
  credentials: 'include'
})
  .then(r => r.json())
  .then((r: any) => {
    authCts.signIn(r)
  })
  .catch((e: any) => {
    console.log('Auth failed:', e)
  })

interface GalleryProviderProps {
  children: ReactNode
}

export function GalleryProvider({ children }: GalleryProviderProps) {
  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  )
}

export { client }


import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { Autocomplete, Icon } from '@servicestack/react'
import { allContacts } from '../data'

export default function AutocompletePage() {
  const [simple, setSimple] = useState<any>(null)
  const [contact, setContact] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])

  return (
    <GalleryLayout title="Autocomplete Component">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>
          The <code>Autocomplete</code> component provides a user friendly Input for being able to search and quickly select items
          with support for partial items view and infinite scrolling.
        </p>
      </div>

      <CodeExample
        title="Single Contact"
        description="Basic autocomplete for selecting a single contact:"
        code={`<Autocomplete 
  id="simple" 
  options={allContacts} 
  value={simple}
  onChange={setSimple}
  label="Single Contact"
  match={(x, value) => x.displayName.toLowerCase().includes(value.toLowerCase())}
  placeholder="Select Contact"
>
  {({ displayName }) => (
    <span className="block truncate">{displayName}</span>
  )}
</Autocomplete>`}
      >
        <div className="mb-3">
          <Autocomplete 
            id="simple" 
            options={allContacts} 
            value={simple}
            onChange={setSimple}
            label="Single Contact"
            match={(x: any, value: string) => x.displayName.toLowerCase().includes(value.toLowerCase())}
            placeholder="Select Contact"
          >
            {({ displayName }: any) => (
              <span className="block truncate">{displayName}</span>
            )}
          </Autocomplete>
          <div className="mt-2 flex justify-end">
            <p>
              <b className="text-gray-500">Single:</b>
              {simple && (
                <div className="flex">
                  <img src={simple.profileUrl} className="w-8 h-8 rounded-full mr-2" alt={simple.displayName} />
                  <b className="text-lg">{simple.displayName}</b>
                </div>
              )}
            </p>
          </div>
        </div>
      </CodeExample>

      <CodeExample
        title="Single Contact with Icon"
        description="Autocomplete with custom item rendering including icons:"
        code={`<Autocomplete 
  id="contact" 
  options={allContacts} 
  value={contact}
  onChange={setContact}
  label="Single Contact with Icon"
  match={(x, value) => x.displayName.toLowerCase().includes(value.toLowerCase())}
  placeholder="Select Contact"
>
  {({ displayName, profileUrl }) => (
    <div className="flex items-center">
      <Icon className="h-6 w-6 flex-shrink-0 rounded-full" src={profileUrl} loading="lazy" />
      <span className="ml-3 truncate">{displayName}</span>
    </div>
  )}
</Autocomplete>`}
      >
        <div className="mb-3">
          <Autocomplete 
            id="contact" 
            options={allContacts} 
            value={contact}
            onChange={setContact}
            label="Single Contact with Icon"
            match={(x: any, value: string) => x.displayName.toLowerCase().includes(value.toLowerCase())}
            placeholder="Select Contact"
          >
            {({ displayName, profileUrl }: any) => (
              <div className="flex items-center">
                <Icon className="h-6 w-6 flex-shrink-0 rounded-full" src={profileUrl} />
                <span className="ml-3 truncate">{displayName}</span>
              </div>
            )}
          </Autocomplete>
          <div className="mt-2 flex justify-end">
            <p>
              <b className="text-gray-500">Single with Icon:</b>
              {contact && (
                <div className="flex">
                  <img src={contact.profileUrl} className="w-8 h-8 rounded-full mr-2" alt={contact.displayName} />
                  <b className="text-lg">{contact.displayName}</b>
                </div>
              )}
            </p>
          </div>
        </div>
      </CodeExample>

      <CodeExample
        title="Multiple Contacts with Icon"
        description="Autocomplete supporting multiple selections:"
        code={`<Autocomplete 
  id="contacts" 
  options={allContacts} 
  value={contacts}
  onChange={setContacts}
  multiple
  label="Multiple Contacts with Icon"
  match={(x, value) => x.displayName.toLowerCase().includes(value.toLowerCase())}
  placeholder="Select Contact"
>
  {({ displayName, profileUrl }) => (
    <div className="flex items-center">
      <Icon className="h-6 w-6 flex-shrink-0 rounded-full" src={profileUrl} loading="lazy" />
      <span className="ml-3 truncate">{displayName}</span>
    </div>
  )}
</Autocomplete>`}
      >
        <div className="mb-3">
          <Autocomplete 
            id="contacts" 
            options={allContacts} 
            value={contacts}
            onChange={setContacts}
            multiple
            label="Multiple Contacts with Icon"
            match={(x: any, value: string) => x.displayName.toLowerCase().includes(value.toLowerCase())}
            placeholder="Select Contact"
          >
            {({ displayName, profileUrl }: any) => (
              <div className="flex items-center">
                <Icon className="h-6 w-6 flex-shrink-0 rounded-full" src={profileUrl} />
                <span className="ml-3 truncate">{displayName}</span>
              </div>
            )}
          </Autocomplete>
          <div className="mt-2">
            <div className="text-right"><b className="text-gray-500">Multiple with Icon:</b></div>
            <p>
              {contacts.length > 0 && (
                <div className="flex flex-wrap">
                  {contacts.map((c: any) => (
                    <div key={c.id} className="flex ml-4 mb-2">
                      <img src={c.profileUrl} className="w-6 h-6 rounded-full mr-2" alt={c.displayName} />
                      <span>{c.displayName}</span>
                    </div>
                  ))}
                </div>
              )}
            </p>
          </div>
        </div>
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mt-12">
        <h2>Features</h2>
        <ul>
          <li>Single and multiple selection modes</li>
          <li>Custom item rendering with render props</li>
          <li>Flexible matching function for search</li>
          <li>Support for icons and complex item layouts</li>
          <li>Infinite scrolling for large datasets</li>
          <li>Keyboard navigation support</li>
        </ul>

        <h2>Props</h2>
        <CodeBlock code={`interface AutocompleteProps<T> {
  id: string
  options: T[]
  value?: T | T[]
  onChange: (value: T | T[]) => void
  label?: string
  placeholder?: string
  multiple?: boolean
  match: (item: T, searchValue: string) => boolean
  children: (item: T) => React.ReactNode
}`} language="typescript" />
      </div>
    </GalleryLayout>
  )
}


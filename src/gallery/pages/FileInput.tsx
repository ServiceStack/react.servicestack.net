import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { FileInput, AutoEditForm } from '@servicestack/react'
import { GalleryProvider } from '../context'
import { allContacts } from '../data'

function FileInputContent() {
  const [contact, setContact] = useState(allContacts[0])
  const [files, setFiles] = useState<any[]>([])

  return (
    <GalleryLayout title="FileInput Component">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>
          The <code>FileInput</code> component beautifies the browsers default HTML file Input, supporting both Single file and Multiple File Uploads.
        </p>
      </div>

      <CodeExample
        title="Single File Upload"
        code={`<FileInput 
  id="profileUrl" 
  label="Single File Upload" 
  value={contact.profileUrl}
  onChange={(value) => setContact({ ...contact, profileUrl: value })}
/>`}
      >
        <FileInput 
          id="profileUrl" 
          label="Single File Upload" 
          value={contact.profileUrl}
          onChange={(value: any) => setContact({ ...contact, profileUrl: value })}
          className="max-w-lg"
        />
      </CodeExample>

      <CodeExample
        title="Multiple File Uploads"
        code={`<FileInput 
  id="profileUrls" 
  label="Multiple File Uploads" 
  multiple 
  files={files}
  onChange={setFiles}
/>`}
      >
        <FileInput
          id="profileUrls"
          label="Multiple File Uploads"
          multiple
          files={files}
          onChange={setFiles as any}
          className="max-w-lg"
        />
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none my-8">
        <p>
          Use <strong>files</strong> when your binding to a <code>UploadedFile</code> complex type or <strong>values</strong> when binding to a <code>string[]</code> of file paths.
          When binding to relative paths, absolute URLs are resolved using assetsPathResolver.
        </p>

        <h2>Invoking APIs containing uploaded files</h2>
        <p>
          When uploading files, you'll need to submit API requests using the <code>apiForm</code> or <code>apiFormVoid</code> methods to send
          a populated <code>FormData</code> instead of a Request DTO:
        </p>
        <CodeBlock code={`import { useClient } from "@servicestack/react"

const client = useClient()

const submit = async (e: React.FormEvent) => {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement
  const api = await client.apiForm(new CreateContact(), new FormData(form))
  if (api.succeeded) {
    //...
  }
}`} language="typescript" />

        <h2>Integrates with Managed File Uploads</h2>
        <p>
          Using Managed File Uploads is a productive solution for easily managing file uploads where you can declaratively specify
          which location uploaded files should be written to:
        </p>
        <CodeBlock code={`public class UpdateContact : IPatchDb<Contact>, IReturn<Contact>
{
    public int Id { get; set; }
    [ValidateNotEmpty]
    public string? FirstName { get; set; }
    [ValidateNotEmpty]
    public string? LastName { get; set; }
    [Input(Type = "file"), UploadTo("profiles")]
    public string? ProfileUrl { get; set; }
    public int? SalaryExpectation { get; set; }
    [ValidateNotEmpty]
    public string? JobType { get; set; }
    public int? AvailabilityWeeks { get; set; }
    public EmploymentType? PreferredWorkType { get; set; }
    public string? PreferredLocation { get; set; }
    [ValidateNotEmpty]
    public string? Email { get; set; }
    public string? Phone { get; set; }
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string>? Skills { get; set; }
    [Input(Type = "textarea")]
    [FieldCss(Field = "col-span-12 text-center", Input = "h-48", Label= "text-xl text-indigo-700")]
    public string? About { get; set; }
}`} language="csharp" />

        <p>
          This metadata information is also available to AutoForm components which supports invoking APIs with uploaded files:
        </p>
      </div>

      <CodeExample
        title="AutoEditForm with File Upload"
        code={`<AutoEditForm 
  type="UpdateContact" 
  value={contact} 
  formStyle="card" 
/>`}
      >
        <AutoEditForm
          type="UpdateContact"
          value={contact}
          formStyle="card"
          panelClass="max-w-3xl"
        />
      </CodeExample>
    </GalleryLayout>
  )
}

export default function FileInputPage() {
  return (
    <GalleryProvider>
      <FileInputContent />
    </GalleryProvider>
  )
}


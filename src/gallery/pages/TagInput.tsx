import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { TagInput, TextInput, AutoEditForm, PrimaryButton, SecondaryButton, ErrorSummary } from '@servicestack/react'
import { GalleryProvider } from '../context'
import { allContacts } from '../data'

function TagInputForm() {
  const [request, setRequest] = useState({
    firstName: '',
    lastName: '',
    skills: [] as string[]
  })

  const visibleFields = "firstName,lastName,skills"

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', request)
  }

  const updateField = (field: string, value: any) => {
    setRequest({ ...request, [field]: value })
  }

  return (
    <form onSubmit={submit}>
      <div className="shadow sm:rounded-md bg-white dark:bg-black">
        <div className="relative px-4 py-5 sm:p-6">
          <fieldset>
            <legend className="text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4">
              TagInput Examples
            </legend>
            <ErrorSummary except={visibleFields} />
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <TextInput
                  id="firstName"
                  value={request.firstName}
                  onChange={(value) => updateField('firstName', value)}
                />
              </div>
              <div className="col-span-6">
                <TextInput
                  id="lastName"
                  value={request.lastName}
                  onChange={(value) => updateField('lastName', value)}
                />
              </div>
              <div className="col-span-12">
                <TagInput
                  id="skills"
                  value={request.skills}
                  onChange={(value) => updateField('skills', value)}
                  label="Technology Skills"
                  allowableValues={['c#','servicestack','react','.net','typescript']}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between">
          <div></div>
          <div className="flex justify-end">
            <SecondaryButton className="mr-4">Cancel</SecondaryButton>
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </div>
        </div>
      </div>
    </form>
  )
}

function TagInputContent() {
  const [contact] = useState(allContacts[0])

  return (
    <GalleryLayout title="TagInput Component">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>
          The <code>TagInput</code> component provides a user friendly control for managing a free-form <code>List&lt;string&gt;</code> tags or symbols
          which is also supported in declarative Auto Forms using the <code>[Input(Type="tag")]</code> attribute.
        </p>
      </div>

      <CodeExample
        title="AutoEditForm with TagInput"
        description="The TagInput component is automatically used in AutoForms when using the [Input(Type='tag')] attribute:"
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

      <div className="prose dark:prose-invert max-w-none my-8">
        <p>Generated from the <strong>UpdateContact</strong> C# Request DTO:</p>
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
      </div>

      <CodeExample
        title="Custom Form"
        description="Alternatively TagInput can be used in Custom Forms directly by binding to a List<string> or string[] model:"
        code={`<TagInput 
  value={request.skills}
  onChange={(value) => updateField('skills', value)}
  label="Technology Skills"
  allowableValues={['c#','servicestack','react','.net','typescript']}
/>`}
      >
        <div className="max-w-screen-md">
          <TagInputForm />
        </div>
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mt-12">
        <h2>Allowable Values</h2>
        <p>
          The list of allowable values can also be populated on C# Request DTO from a JavaScript expression:
        </p>
        <CodeBlock code={`public class MyRequest
{
    [Input(Type = "tag", Options="{ allowableValues: ['c#','servicestack','react'] }")]
    public List<string>? Skills { get; set; }
}`} language="csharp" />

        <p>Or from a #Script Expression in <code>EvalAllowableValues</code> where it can be populated from a static list:</p>
        <CodeBlock code={`public class MyRequest
{
    [Input(Type = "tag", EvalAllowableValues="['c#','servicestack','react']")]
    public List<string>? Skills { get; set; }
}`} language="csharp" />

        <p>Or sourced from a C# Expression:</p>
        <CodeBlock code={`public class MyRequest
{
    [Input(Type = "tag", EvalAllowableValues="AppData.Tags")]
    public List<string>? Skills { get; set; }
}`} language="csharp" />

        <p>
          Where it can be populated from a dynamic data source like from an RDBMS populated in your AppHost on Startup.
        </p>
      </div>
    </GalleryLayout>
  )
}

export default function TagInputPage() {
  return (
    <GalleryProvider>
      <TagInputContent />
    </GalleryProvider>
  )
}


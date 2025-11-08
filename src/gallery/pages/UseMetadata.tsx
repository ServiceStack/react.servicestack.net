import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function UseMetadataPage() {
  return (
    <GalleryLayout title="useMetadata Hook">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          The rich server metadata about your APIs that's used to generate your App's DTOs in Multiple Programming Languages,
          power ServiceStack's built-in Auto UIs also power the Metadata driven components in the <strong>@servicestack/react</strong> component library.
        </p>

        <h2>Loading Metadata</h2>
        <p>
          The metadata can be loaded in your app using an optimal configuration:
        </p>
        <CodeBlock code={`import { useMetadata } from "@servicestack/react"

const { loadMetadata } = useMetadata()

// Load metadata with caching strategy
await loadMetadata({
  olderThan: 60 * 60 * 1000 // Reload if older than 1 hour
})`} language="typescript" />

        <h2>Available Functions</h2>
        <p>
          Once loaded, the AppMetadata features can be accessed with the helper functions in <code>useMetadata()</code>:
        </p>
        <CodeBlock code={`import { useMetadata } from "@servicestack/react"

const { 
  loadMetadata,      // Load {AppMetadata} if needed 
  setMetadata,       // Explicitly set AppMetadata and save to localStorage
  clearMetadata,     // Delete AppMetadata and remove from localStorage
  metadataApi,       // Reactive accessor to Ref<MetadataTypes>
  typeOf,            // Resolve {MetadataType} for DTO name
  typeOfRef,         // Resolve {MetadataType} by {MetadataTypeName}
  apiOf,             // Resolve Request DTO {MetadataOperationType} by name
  property,          // Resolve {MetadataPropertyType} by Type and Property name
  enumOptions,       // Resolve Enum entries for Enum Type by name
  propertyOptions,   // Resolve allowable entries for property by {MetadataPropertyType}
  createFormLayout,  // Create Form Layout's {InputInfo[]} from {MetadataType}
  typeProperties,    // Return all properties (inc. inherited) for {MetadataType}
  supportsProp,      // Check if a supported HTML Input exists for {MetadataPropertyType}
  Crud,              // Query metadata information about AutoQuery CRUD Types
  getPrimaryKey,     // Resolve PrimaryKey {MetadataPropertyType} for {MetadataType}
  getId,             // Resolve Primary Key value from {MetadataType} and row instance
  createDto,         // Create a Request DTO instance for Request DTO name
  toFormValues,      // Convert Request DTO values to supported HTML Input values
  formValues,        // Convert HTML Input values to supported DTO values
} = useMetadata()`} language="tsx" />

        <h2>Enum Values and Property Options</h2>
        <p>
          This can avoid code maintenance and duplication efforts from maintaining enum values on both server and client forms.
        </p>
        <CodeBlock code={`const { enumOptions, property, propertyOptions } = useMetadata()

// Get enum options for a Title enum
const titleOptions = enumOptions('Title')

// Get property options from metadata
const colorOptions = propertyOptions(property('CreateContact','Color'))`} language="typescript" />

        <h3>Example Usage in Forms</h3>
        <CodeBlock code={`import { SelectInput } from "@servicestack/react"
import { useMetadata } from "@servicestack/react"

function ContactForm() {
  const { enumOptions } = useMetadata()
  const [title, setTitle] = useState('')
  
  return (
    <SelectInput 
      id="title" 
      value={title}
      onChange={setTitle}
      options={enumOptions('Title')} 
    />
  )
}`} language="tsx" />

        <h2>Server-Side Configuration</h2>
        <p>
          Property options can be populated from C# using various methods:
        </p>

        <h3>JavaScript Expression</h3>
        <CodeBlock code={`public class MyRequest
{
    [Input(Type = "select", Options = "{ allowableValues: ['Alpha','Bravo','Charlie'] }")]
    public string? Value { get; set; }
}`} language="csharp" />

        <h3>Script Expression</h3>
        <CodeBlock code={`public class MyRequest
{
    [Input(Type = "select", EvalAllowableValues = "['Alpha','Bravo','Charlie']")]
    public string? Value { get; set; }
}`} language="csharp" />

        <h3>Dynamic Data Source</h3>
        <CodeBlock code={`public class MyRequest
{
    [Input(Type = "select", EvalAllowableValues = "AppData.Tags")]
    public string? Value { get; set; }
}

// In AppHost
public class AppData
{
    public List<string> Tags { get; set; }
}

// Populated on Startup
ScriptContext.Args[nameof(AppData)] = new AppData
{
    Tags = new() { "Alpha", "Bravo", "Charlie" }
};`} language="csharp" />

        <h2>TypeScript Definition</h2>
        <CodeBlock code={`/** Load {AppMetadata} if needed */
function loadMetadata(args: {
  olderThan?: number;
  resolvePath?: string;
  resolve?: () => Promise<Response>;
}): Promise<AppMetadata>;

/** Resolve {MetadataType} for DTO name */
function typeOf(name?: string | null, namespace?: string | null): MetadataType | null;

/** Resolve Request DTO {MetadataOperationType} by name */
function apiOf(name: string): MetadataOperationType | null;

/** Resolve {MetadataPropertyType} by Type and Property name */
function property(typeName: string, name: string): MetadataPropertyType | null;

/** Resolve Enum entries for Enum Type by name */
function enumOptions(name: string): { [name: string]: string; } | null;

/** Resolve allowable entries for property by {MetadataPropertyType} */
function propertyOptions(prop: MetadataPropertyType): { [name: string]: string; } | null;

/** Create a Request DTO instance for Request DTO name */
function createDto(name: string, obj?: any): any;

/** Convert Request DTO values to supported HTML Input values */
function toFormValues(dto: any, metaType?: MetadataType | null): any;`} language="tsx" />
      </div>
    </GalleryLayout>
  )
}


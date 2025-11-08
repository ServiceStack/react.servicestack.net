import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function UseClientPage() {
  return (
    <GalleryLayout title="useClient Hook">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          <code>useClient()</code> provides managed APIs around the <code>JsonServiceClient</code> instance
          which maintains contextual information around your API calls like <strong>loading</strong> and <strong>error</strong> states,
          used by @servicestack/react components to enable auto validation binding.
        </p>

        <h2>Available Functions</h2>
        <CodeBlock code={`import { useClient } from "@servicestack/react"

const {
  api,            // Send a typed API request and return results in an ApiResult<TResponse>
  apiVoid,        // Send a typed API request and return empty response in a void ApiResult
  apiForm,        // Send a FormData API request and return results in an ApiResult<TResponse>
  apiFormVoid,    // Send a FormData API request and return empty response in a void ApiResult
  loading,        // Maintain loading state whilst API Request is in transit
  error,          // Maintain API Error response in reactive Ref<ResponseStatus>
  setError,       // Set API error state with summary or field validation error
  addFieldError,  // Add field error to API error state
  unRefs          // Returns a dto with all Refs unwrapped
} = useClient()`} language="typescript" />

        <h2>API Methods</h2>

        <h3>api()</h3>
        <p>
          Send a typed API request and return results in an <code>ApiResult&lt;TResponse&gt;</code>:
        </p>
        <CodeBlock code={`import { useClient } from "@servicestack/react"

function MyComponent() {
  const client = useClient()

  const handleSubmit = async () => {
    const api = await client.api(new Hello({ name: 'World' }))
    if (api.succeeded) {
      console.log(api.response)
    }
  }
}`} language="tsx" />

        <h3>apiForm()</h3>
        <p>
          Send a FormData API request (required for file uploads):
        </p>
        <CodeBlock code={`const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement
  const api = await client.apiForm(new CreateContact(), new FormData(form))
  if (api.succeeded) {
    // Handle success
  }
}`} language="typescript" />

        <h2>Form Validation</h2>
        <p>
          All @servicestack/react Input Components support contextual validation binding that's typically populated from API
          Error Response DTOs but can also be populated from client-side validation.
        </p>

        <h3>setError</h3>
        <p>
          <code>setError</code> can be used to populate client-side validation errors:
        </p>
        <CodeBlock code={`const { api, setError } = useClient()

async function onSubmit() {
  if (password !== confirmPassword) {
    setError({
      fieldName: 'confirmPassword',
      message: 'Passwords do not match'
    })
    return
  }

  const api = await client.api(new Register({
    password,
    confirmPassword
  }))
  if (api.succeeded) {
    // Handle success
  }
}`} language="typescript" />

        <h3>Implicit Error Handling</h3>
        <p>
          Components can take advantage of implicit validation support in <code>useClient()</code> which makes its state
          available to child components, alleviating the need to explicitly pass it to each component:
        </p>
        <CodeBlock code={`function EditContact({ contact }) {
  const client = useClient()
  const [request, setRequest] = useState(new UpdateContact(contact))

  const submit = async () => {
    const api = await client.api(request)
    if (api.succeeded) {
      // Handle success
    }
    // Errors automatically displayed in form inputs
  }

  return (
    <form onSubmit={submit}>
      <ErrorSummary except="firstName,lastName,email" />
      <TextInput id="firstName" value={request.firstName}
        onChange={(v) => setRequest({...request, firstName: v})} />
      <TextInput id="lastName" value={request.lastName}
        onChange={(v) => setRequest({...request, lastName: v})} />
      <TextInput id="email" value={request.email}
        onChange={(v) => setRequest({...request, email: v})} />
      <PrimaryButton type="submit">Update</PrimaryButton>
    </form>
  )
}`} language="tsx" />

        <h2>Stale-While-Revalidate APIs</h2>
        <p>
          A popular performance enhancing technique to improve perceived performance using Stale-While-Revalidate (SWR) APIs
          which can deliver just as good UX as complex SPAs with stateless full page reloads.
        </p>

        <h3>swr()</h3>
        <p>
          If the same API request had been run before, it will execute the callback immediately with its "stale" cached results
          in localStorage first, before invoking the callback again after receiving the API response with the latest data:
        </p>
        <CodeBlock code={`import { useClient } from "@servicestack/react"

function MyComponent() {
  const client = useClient()
  const [results, setResults] = useState([])

  useEffect(() => {
    client.swr(new QueryBookings(), api => {
      setResults(api.response?.results || [])
    })
  }, [])
}`} language="tsx" />

        <h3>swrEffect()</h3>
        <p>
          The built-in <code>swrEffect()</code> API uses React's <code>useEffect</code> to detect property changes to trigger
          invoking the API request:
        </p>
        <CodeBlock code={`const client = useClient()
const api = client.swrEffect(() => new Hello({ name: props.name }))

// With debounce (wait 50ms after user stops typing)
const api = client.swrEffect(
  () => new Hello({ name: props.name }),
  { delayMs: 50 }
)`} language="typescript" />

        <h2>TypeScript Definition</h2>
        <CodeBlock code={`/** Maintain loading state whilst API Request is in transit */
const loading: Ref<boolean>

/** Maintain API Error in reactive Ref<ResponseStatus> */
const error: Ref<ResponseStatus>

/** Set error state with summary or field validation error */
function setError({ message, errorCode, fieldName, errors }: IResponseStatus);

/** Add field error to API error state */
function addFieldError({ fieldName, message, errorCode }: IResponseError);

/** Send a typed API request and return results in an ApiResult<TResponse> */
async function api<TResponse>(
  request: IReturn<TResponse> | ApiRequest,
  args?: any,
  method?: string
);

/** Send a typed API request and return empty response in a void ApiResult */
async function apiVoid(
  request: IReturnVoid | ApiRequest,
  args?: any,
  method?: string
);

/** Send a FormData API request and return results in an ApiResult<TResponse> */
async function apiForm<TResponse>(
  request: IReturn<TResponse> | ApiRequest,
  body: FormData,
  args?: any,
  method?: string
);

/** Send a FormData API request and return empty response in a void ApiResult */
async function apiFormVoid(
  request: IReturnVoid | ApiRequest,
  body: FormData,
  args?: any,
  method?: string
);`} language="typescript" />
      </div>
    </GalleryLayout>
  )
}


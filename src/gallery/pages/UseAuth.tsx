import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function UseAuthPage() {
  return (
    <GalleryLayout title="useAuth Hook">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          React Apps can access Authenticated Users using <code>useAuth()</code> which provides utilities for inspecting
          the current authenticated user.
        </p>

        <h2>Available Functions</h2>
        <CodeBlock code={`import { useAuth } from "@servicestack/react"

const {
  signIn,           // Sign In the currently Authenticated User
  signOut,          // Sign Out currently Authenticated User
  user,             // Access Authenticated User info in a reactive Ref<AuthenticateResponse>
  isAuthenticated,  // Check if the current user is Authenticated in a reactive Ref<boolean>
  hasRole,          // Check if the Authenticated User has a specific role
  hasPermission,    // Check if the Authenticated User has a specific permission
  isAdmin           // Check if the Authenticated User has the Admin role
} = useAuth()`} language="typescript" />

        <h2>Usage Examples</h2>

        <h3>Check Authentication Status</h3>
        <CodeBlock code={`import { useAuth } from "@servicestack/react"

function MyComponent() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.displayName}!</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  )
}`} language="tsx" />

        <h3>Role-Based Access Control</h3>
        <CodeBlock code={`import { useAuth } from "@servicestack/react"

function BookingForm() {
  const { hasRole } = useAuth()
  const canDelete = hasRole('Manager')

  return (
    <AutoEditForm
      type="UpdateBooking"
      deleteType={canDelete ? 'DeleteBooking' : undefined}
    />
  )
}`} language="tsx" />

        <h3>Permission-Based Features</h3>
        <CodeBlock code={`function AdminPanel() {
  const { hasPermission, isAdmin } = useAuth()

  return (
    <div>
      {isAdmin() && (
        <button>Admin Settings</button>
      )}
      {hasPermission('CanEditUsers') && (
        <button>Edit Users</button>
      )}
    </div>
  )
}`} language="tsx" />

        <h3>Sign In/Out</h3>
        <CodeBlock code={`import { useAuth, useClient } from "@servicestack/react"

function AuthButtons() {
  const { signIn, signOut, isAuthenticated } = useAuth()
  const client = useClient()

  const handleSignIn = async () => {
    const api = await client.api(new Authenticate({
      provider: 'credentials',
      userName: 'admin@email.com',
      password: 'p@55wOrd'
    }))
    if (api.succeeded) {
      signIn(api.response)
    }
  }

  const handleSignOut = async () => {
    await client.api(new Authenticate({ provider: 'logout' }))
    signOut()
  }

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  )
}`} language="tsx" />

        <h2>Server-Side Integration</h2>
        <p>
          Apps can populate the authenticated user without the overhead of an Ajax request by embedding the response
          of the built-in Authenticate API:
        </p>
        <CodeBlock code={`<!-- In _Layout.cshtml -->
<script type="module">
import { useAuth } from "@servicestack/react"
const { signIn } = useAuth()
signIn(@await Html.ApiAsJsonAsync(new Authenticate()))
</script>`} language="typescript" />

        <h2>User Object Structure</h2>
        <p>
          The <code>user</code> object contains the authenticated user's information from the <code>AuthenticateResponse</code> DTO:
        </p>
        <CodeBlock code={`interface AuthenticateResponse {
  userId: string
  sessionId: string
  userName: string
  displayName: string
  referrerUrl: string
  bearerToken: string
  refreshToken: string
  profileUrl: string
  roles: string[]
  permissions: string[]
  responseStatus: ResponseStatus
  meta: { [index: string]: string }
}`} language="typescript" />

        <h2>TypeScript Definition</h2>
        <CodeBlock code={`/** Access the currently Authenticated User info in a reactive Ref<AuthenticateResponse> */
const user: Ref<AuthenticateResponse>

/** Check if the current user is Authenticated in a reactive Ref<boolean> */
const isAuthenticated: Ref<boolean>

/** Sign In the currently Authenticated User */
function signIn(user: AuthenticateResponse): void;

/** Sign Out currently Authenticated User */
function signOut(): void;

/** Check if the Authenticated User has a specific role */
function hasRole(role: string): boolean;

/** Check if the Authenticated User has a specific permission */
function hasPermission(permission: string): boolean;

/** Check if the Authenticated User has the Admin role */
function isAdmin(): boolean;`} language="typescript" />
      </div>
    </GalleryLayout>
  )
}


import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { ModalDialog, SlideOver, SecondaryButton, Alert, SignIn } from '@servicestack/react'
import { useAuth } from '@servicestack/react'

export default function ModalsPage() {
  const [showDialog, setShowDialog] = useState(false)
  const [showSlide, setShowSlide] = useState(false)
  const { user } = useAuth()

  return (
    <GalleryLayout title="Modal Components">
      <CodeExample
        title="ModalDialog"
        description="Use <ModalDialog> component to show any content inside a Modal Dialog:"
        code={`<SecondaryButton onClick={() => setShowDialog(true)}>Show Modal</SecondaryButton>
{showDialog && (
  <ModalDialog onDone={() => setShowDialog(false)}>
    <h3 className="p-8 text-3xl">Hello @servicestack/react!</h3>
  </ModalDialog>
)}`}
      >
        <SecondaryButton onClick={() => setShowDialog(true)}>Show Modal</SecondaryButton>
        {showDialog && (
          <ModalDialog onDone={() => setShowDialog(false)}>
            <h3 className="p-8 text-3xl">Hello @servicestack/react!</h3>
          </ModalDialog>
        )}
      </CodeExample>

      <CodeExample
        title="SlideOver"
        description="Use <SlideOver> to show contents inside an animated slide over:"
        code={`<SecondaryButton onClick={() => setShowSlide(true)}>Show Slide</SecondaryButton>
{showSlide && (
  <SlideOver 
    title="The Title" 
    onDone={() => setShowSlide(false)} 
    contentClass="relative flex-1"
  >
    <div slot="subtitle">
      a <b>subtitle</b>
    </div>
    <Alert type="error">Authentication Required</Alert>
    <div className="md:p-4">
      <SecondaryButton>Sign In</SecondaryButton>
    </div>
  </SlideOver>
)}`}
      >
        <SecondaryButton onClick={() => setShowSlide(true)} className="mt-4">Show Slide</SecondaryButton>
        {showSlide && (
          <SlideOver 
            title="The Title" 
            onDone={() => setShowSlide(false)} 
            contentClass="relative flex-1"
          >
            <Alert type="error">Authentication Required</Alert>
            <div className="md:p-4">
              <SecondaryButton>Sign In</SecondaryButton>
            </div>
          </SlideOver>
        )}
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>
          As seen in this example we can use <strong>contentClass</strong> to customize the inner body contents,
          with all other inner contents displayed in the SlideOver's body.
        </p>
      </div>

      <CodeExample
        title="SignIn"
        description="The <SignIn> Component can be used to create an instant Sign Up form based on the registered Auth Providers that handles Signing In authenticated users into React Apps with the useAuth() APIs:"
        code={`import { useAuth } from '@servicestack/react'

const { user } = useAuth()

{!user ? (
  <SignIn />
) : (
  <h3 className="text-2xl my-4">Hello, {user.displayName}</h3>
)}`}
      >
        {!user ? (
          <SignIn tabs={false} />
        ) : (
          <h3 className="text-2xl my-4">Hello, {user.displayName}</h3>
        )}
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none">
        <h3>SignIn Properties</h3>
        <CodeBlock code={`interface SignInProps {
  provider?: string  // which Auth Provider to default to
  title?: string     //= Sign In - Heading
  tabs?: boolean     //= true - Show different Auth Provider tabs
  oauth?: boolean    //= true - Show OAuth Provider buttons
}`} language="typescript" />

        <h3>Events</h3>
        <p>Use <code>onLogin</code> to run custom logic after successful authentication:</p>
        <CodeBlock code={`<SignIn onLogin={(auth) => {
  console.log('User logged in:', auth)
}} />`} language="tsx" />
      </div>
    </GalleryLayout>
  )
}


import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import { Alert, AlertSuccess, ErrorSummary } from '@servicestack/react'

export default function AlertsPage() {
  const message = "Requires <b>Employee</b> Role"

  return (
    <GalleryLayout title="Alert Components">
      <CodeExample
        title="Alert"
        description="Show basic alert message:"
        code={`<Alert>Default <b>Message</b></Alert>
<Alert type="info">Information <b>Message</b></Alert>
<Alert type="success">Success <b>Message</b></Alert>
<Alert type="warn">Warning <b>Message</b></Alert>
<Alert type="error">Error <b>Message</b></Alert>`}
      >
        <div className="space-y-4">
          <Alert>Default <b>Message</b></Alert>
          <Alert type="info">Information <b>Message</b></Alert>
          <Alert type="success">Success <b>Message</b></Alert>
          <Alert type="warn">Warning <b>Message</b></Alert>
          <Alert type="error">Error <b>Message</b></Alert>
        </div>
      </CodeExample>

      <CodeExample
        description="Show alert message from dynamic HTML string:"
        code={`<Alert dangerouslySetInnerHTML={{ __html: message }} />

const message = "Requires <b>Employee</b> Role"`}
      >
        <Alert dangerouslySetInnerHTML={{ __html: message }} />
      </CodeExample>

      <CodeExample
        title="Alert Success"
        description="Show success alert message:"
        code={`<AlertSuccess>Order was received</AlertSuccess>`}
      >
        <AlertSuccess>Order was received</AlertSuccess>
      </CodeExample>

      <CodeExample
        title="Error Summary"
        description="Show failed Summary API Error Message:"
        code={`<ErrorSummary status={{ message:'Requires Employee Role' }} />`}
      >
        <ErrorSummary status={{ message:'Requires Employee Role' }} />
      </CodeExample>
    </GalleryLayout>
  )
}


import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { PreviewFormat } from '@servicestack/react'
import { useFormatters } from '@servicestack/react'

export default function FormatsPage() {
  const { Formats } = useFormatters()

  return (
    <GalleryLayout title="Format Examples">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>
          Useful for rendering Table Cell data into different customizable formats:
        </p>
      </div>

      <CodeExample
        title="Currency"
        code={`<PreviewFormat value={50} format={Formats.currency} />`}
      >
        <PreviewFormat value={50} format={Formats.currency} />
      </CodeExample>

      <CodeExample
        title="Bytes"
        code={`<PreviewFormat value={10000000} format={Formats.bytes} />`}
      >
        <PreviewFormat value={10000000} format={Formats.bytes} />
      </CodeExample>

      <CodeExample
        title="Icon"
        code={`<PreviewFormat value="/pages/vue/1.jpg" format={Formats.icon} />`}
      >
        <PreviewFormat value="https://blazor-gallery.servicestack.net/profiles/1.jpg" format={Formats.icon} />
      </CodeExample>

      <CodeExample
        title="Icon Rounded"
        code={`<PreviewFormat value="/pages/vue/1.jpg" format={Formats.iconRounded} />`}
      >
        <PreviewFormat value="https://blazor-gallery.servicestack.net/profiles/1.jpg" format={Formats.iconRounded} />
      </CodeExample>

      <CodeExample
        title="Icon with custom class"
        code={`<PreviewFormat value="/pages/vue/1.jpg" format={Formats.icon} className="w-40 h-40 rounded-full" />`}
      >
        <PreviewFormat value="https://blazor-gallery.servicestack.net/profiles/1.jpg" format={Formats.icon} {...{ className: "w-40 h-40 rounded-full" } as any} />
      </CodeExample>

      <CodeExample
        title="Attachment (Image)"
        code={`<PreviewFormat value="/pages/vue/1.jpg" format={Formats.attachment} />`}
      >
        <PreviewFormat value="https://blazor-gallery.servicestack.net/profiles/1.jpg" format={Formats.attachment} />
      </CodeExample>

      <CodeExample
        title="Attachment (Document)"
        code={`<PreviewFormat value="/content/hosting.md" format={Formats.attachment} />`}
      >
        <PreviewFormat value="/content/hosting.md" format={Formats.attachment} />
      </CodeExample>

      <CodeExample
        title="Attachment (Document) with classes"
        code={`<PreviewFormat
  value="/content/hosting.md"
  format={Formats.attachment}
  className="text-xl text-indigo-700 font-semibold"
  iconClass="w-8 h-8"
/>`}
      >
        <PreviewFormat
          value="/content/hosting.md"
          format={Formats.attachment}
          {...{ className: "text-xl text-indigo-700 font-semibold", iconClass: "w-8 h-8" } as any}
        />
      </CodeExample>

      <CodeExample
        title="Link"
        code={`<PreviewFormat value="https://servicestack.net/react" format={Formats.link} />`}
      >
        <PreviewFormat value="https://servicestack.net/react" format={Formats.link} />
      </CodeExample>

      <CodeExample
        title="Link with class"
        code={`<PreviewFormat value="https://servicestack.net/react" format={Formats.link} className="text-xl text-blue-600" />`}
      >
        <PreviewFormat value="https://servicestack.net/react" format={Formats.link} {...{ className: "text-xl text-blue-600" } as any} />
      </CodeExample>

      <CodeExample
        title="Link Email"
        code={`<PreviewFormat value="user@email.com" format={Formats.linkMailTo} />`}
      >
        <PreviewFormat value="user@email.com" format={Formats.linkMailTo} />
      </CodeExample>

      <CodeExample
        title="Link Phone"
        code={`<PreviewFormat value="555 123 4567" format={Formats.linkTel} />`}
      >
        <PreviewFormat value="555 123 4567" format={Formats.linkTel} />
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mt-12">
        <h2>Using Formatters</h2>
        <p>
          Your App and custom templates can also utilize @servicestack/react's built-in formatting functions from:
        </p>
        <CodeBlock code={`import { useFormatters } from '@servicestack/react'

const {
  Formats,             // Available format methods to use in <PreviewFormat />
  formatValue,         // Format any value or object graph
  currency,            // Format number as Currency
  bytes,               // Format number in human readable disk size
  link,                // Format URL as <a> link
  linkTel,             // Format Phone Number as <a> tel: link
  linkMailTo,          // Format email as <a> mailto: link
  icon,                // Format Image URL as an Icon
  iconRounded,         // Format Image URL as a full rounded Icon
  attachment,          // Format File attachment URL as an Attachment
  hidden,              // Format as empty string
  time,                // Format duration in time format
  relativeTime,        // Format Date as Relative Time from now
  relativeTimeFromMs,  // Format time in ms as Relative Time from now
  formatDate,          // Format as Date
  formatNumber,        // Format as Number
} = useFormatters()`} language="typescript" />

        <p>
          Many of these formatting functions return rich HTML markup which will need to be rendered using React's <code>dangerouslySetInnerHTML</code>:
        </p>
        <CodeBlock code={`<span dangerouslySetInnerHTML={{ __html: formatValue(value) }} />`} language="tsx" />
      </div>
    </GalleryLayout>
  )
}


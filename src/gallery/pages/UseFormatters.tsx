import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function UseFormattersPage() {
  return (
    <GalleryLayout title="useFormatters Hook">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Your App and components can utilize the built-in formatting functions in <code>useFormatters()</code> for
          consistent data presentation across your application.
        </p>

        <h2>Available Functions</h2>
        <CodeBlock code={`import { useFormatters } from '@servicestack/react'

const {
  Formats,              // Available format methods to use in <PreviewFormat />
  formatValue,          // Format any value or object graph
  currency,             // Format number as Currency
  bytes,                // Format number in human readable disk size
  link,                 // Format URL as <a> link
  linkTel,              // Format Phone Number as <a> tel: link
  linkMailTo,           // Format email as <a> mailto: link
  icon,                 // Format Image URL as an Icon
  iconRounded,          // Format Image URL as a full rounded Icon
  attachment,           // Format File attachment URL as an Attachment
  hidden,               // Format as empty string
  time,                 // Format duration in time format
  relativeTime,         // Format Date as Relative Time from now
  relativeTimeFromMs,   // Format time in ms as Relative Time from now
  relativeTimeFromDate, // Format difference between dates as Relative Time
  formatDate,           // Format as Date
  formatNumber,         // Format as Number

  setDefaultFormats,    // Set default locale, number and Date formats
  setFormatters,        // Register additional formatters for use in <PreviewFormat />
  indentJson,           // Prettify an API JSON Response
  truncate,             // Truncate text that exceeds maxLength with an ellipsis
  apiValueFmt,          // Format an API Response value
} = useFormatters()`} language="tsx" />

        <h2>Usage Examples</h2>

        <h3>Currency Formatting</h3>
        <CodeBlock code={`import { useFormatters } from '@servicestack/react'

function PriceDisplay({ amount }) {
  const { currency } = useFormatters()
  
  return (
    <div dangerouslySetInnerHTML={{ __html: currency(amount) }} />
  )
}

// Output: $1,234.56`} language="tsx" />

        <h3>File Size Formatting</h3>
        <CodeBlock code={`const { bytes } = useFormatters()

function FileSize({ size }) {
  return (
    <span dangerouslySetInnerHTML={{ __html: bytes(size) }} />
  )
}

// bytes(1024) => "1 KB"
// bytes(1048576) => "1 MB"
// bytes(1073741824) => "1 GB"`} language="tsx" />

        <h3>Link Formatting</h3>
        <CodeBlock code={`const { link, linkMailTo, linkTel } = useFormatters()

// URL Link
<div dangerouslySetInnerHTML={{ 
  __html: link('https://example.com', { cls: 'text-blue-600' }) 
}} />

// Email Link
<div dangerouslySetInnerHTML={{ 
  __html: linkMailTo('user@example.com', { 
    subject: 'Hello',
    cls: 'text-blue-600' 
  }) 
}} />

// Phone Link
<div dangerouslySetInnerHTML={{ 
  __html: linkTel('+1-555-0123', { cls: 'text-blue-600' }) 
}} />`} language="tsx" />

        <h3>Date and Time Formatting</h3>
        <CodeBlock code={`const { formatDate, relativeTime, time } = useFormatters()

// Format Date
formatDate(new Date()) // "Jan 15, 2024"

// Relative Time
relativeTime(new Date(Date.now() - 3600000)) // "1 hour ago"

// Duration
time(3665) // "01:01:05"`} language="typescript" />

        <h3>Icon and Attachment Formatting</h3>
        <CodeBlock code={`const { icon, iconRounded, attachment } = useFormatters()

// Icon
<div dangerouslySetInnerHTML={{ 
  __html: icon('/img/avatar.jpg', { class: 'w-8 h-8' }) 
}} />

// Rounded Icon
<div dangerouslySetInnerHTML={{ 
  __html: iconRounded('/img/avatar.jpg', { class: 'w-8 h-8' }) 
}} />

// File Attachment
<div dangerouslySetInnerHTML={{ 
  __html: attachment('/files/document.pdf') 
}} />`} language="tsx" />

        <h2>Set Global Default Formats</h2>
        <p>
          Global default formats can be customized with <code>setDefaultFormats</code>:
        </p>
        <CodeBlock code={`import { setDefaultFormats } from '@servicestack/react'

setDefaultFormats({
  locale: null,     // Use Browser's default locale
  assumeUtc: true,
  number: null,     // Use locale Number format
  date: {
    method: "Intl.DateTimeFormat",
    options: "{dateStyle:'medium'}"
  },
  maxFieldLength: 150,
  maxNestedFields: 150,
  maxNestedFieldLength: 150,
})`} language="typescript" />

        <h2>Register Custom Formatters</h2>
        <p>
          Use <code>setFormatters</code> to register new formatters for use in <code>&lt;PreviewFormat/&gt;</code> components:
        </p>
        <CodeBlock code={`import { setFormatters } from '@servicestack/react'

// Register a QR Code formatter
function qrcode(content: string) {
  return \`<img src="https://api.qrserver.com/v1/create-qr-code/?data=\${encodeURIComponent(content)}" />\`
}

setFormatters({
  qrcode,
})

// Use in PreviewFormat
<PreviewFormat value={url} format={{ method: 'qrcode' }} />`} language="tsx" />

        <h3>C# DTO Integration</h3>
        <p>
          Custom formatters can be used with the <code>[Format]</code> attribute in C# DTOs:
        </p>
        <CodeBlock code={`public class MyDto
{
    [Format("qrcode")]
    public string Code { get; set; }
}`} language="csharp" />

        <h2>Override Built-in Formatters</h2>
        <p>
          <code>setFormatters</code> can also override built-in formatting functions:
        </p>
        <CodeBlock code={`setFormatters({
  currency: (val: number) => \`€\${val.toFixed(2)}\`,
  bytes: (val: number) => \`\${(val / 1024).toFixed(2)} KB\`,
  // ... other formatters
})`} language="typescript" />

        <h2>Utility Functions</h2>

        <h3>Truncate Text</h3>
        <CodeBlock code={`const { truncate } = useFormatters()

truncate('This is a very long text that needs truncating', 20)
// "This is a very lo..."`} language="typescript" />

        <h3>Prettify JSON</h3>
        <CodeBlock code={`const { indentJson } = useFormatters()

const formatted = indentJson({ name: 'John', age: 30 })
// {
//   "name": "John",
//   "age": 30
// }`} language="typescript" />

        <h2>See Also</h2>
        <p>
          For visual examples of all formatters, see the <a href="/gallery/formats" className="text-blue-600 dark:text-blue-400 hover:underline">Formats</a> page.
        </p>
      </div>
    </GalleryLayout>
  )
}


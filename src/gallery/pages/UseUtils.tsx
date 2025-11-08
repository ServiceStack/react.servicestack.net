import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function UseUtilsPage() {
  return (
    <GalleryLayout title="useUtils Hook">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          General utils used by React Components you may also find useful in your Apps.
        </p>

        <h2>Available Functions</h2>
        <CodeBlock code={`import { useUtils } from "@servicestack/react"

const {
  dateInputFormat,  // Format Date into required input[type=date] format
  timeInputFormat,  // Format TimeSpan or Date into required input[type=time] format
  setRef,           // Double set reactive Ref<T> to force triggering updates
  unRefs,           // Returns a dto with all Refs unwrapped
  transition,       // Update reactive transition class based on Tailwind animation
  focusNextElement, // Set focus to the next element inside a HTML Form
  getTypeName,      // Resolve Request DTO name from a Request DTO instance
  htmlTag,          // HTML Tag builder
  htmlAttrs,        // Convert object dictionary into encoded HTML attributes
  linkAttrs,        // Convert HTML Anchor attributes into encoded HTML attributes
  toAppUrl,         // Resolve Absolute URL from relative path
  isPrimitive,      // Check if value is a scalar type
  isComplexType,    // Check if value is a non-scalar type
} = useUtils()`} language="tsx" />

        <h2>Usage Examples</h2>

        <h3>Date and Time Formatting</h3>
        <CodeBlock code={`import { useUtils } from "@servicestack/react"

function DateTimeInputs() {
  const { dateInputFormat, timeInputFormat } = useUtils()
  const [date, setDate] = useState(new Date())
  
  return (
    <div>
      <input 
        type="date" 
        value={dateInputFormat(date)} 
        onChange={(e) => setDate(new Date(e.target.value))}
      />
      <input 
        type="time" 
        value={timeInputFormat(date)} 
        onChange={(e) => {
          const [hours, minutes] = e.target.value.split(':')
          const newDate = new Date(date)
          newDate.setHours(parseInt(hours), parseInt(minutes))
          setDate(newDate)
        }}
      />
    </div>
  )
}

// dateInputFormat(new Date('2024-01-15')) => "2024-01-15"
// timeInputFormat(new Date('2024-01-15 14:30')) => "14:30"`} language="tsx" />

        <h3>Type Checking</h3>
        <CodeBlock code={`const { isPrimitive, isComplexType } = useUtils()

isPrimitive(42)              // true
isPrimitive("hello")         // true
isPrimitive(true)            // true
isPrimitive(null)            // true
isPrimitive(undefined)       // true

isComplexType({})            // true
isComplexType([])            // true
isComplexType(new Date())    // true
isComplexType(42)            // false`} language="typescript" />

        <h3>HTML Generation</h3>
        <CodeBlock code={`const { htmlTag, htmlAttrs, linkAttrs } = useUtils()

// Build HTML tags
htmlTag('div', 'Hello World', { class: 'text-lg', id: 'greeting' })
// <div class="text-lg" id="greeting">Hello World</div>

// Generate HTML attributes
htmlAttrs({ class: 'btn', disabled: true, 'data-id': '123' })
// class="btn" disabled data-id="123"

// Generate link attributes
linkAttrs({ 
  href: 'https://example.com', 
  cls: 'text-blue-600',
  target: '_blank' 
})
// { href: 'https://example.com', class: 'text-blue-600', target: '_blank', rel: 'noopener' }`} language="tsx" />

        <h3>URL Resolution</h3>
        <CodeBlock code={`const { toAppUrl } = useUtils()

// Convert relative paths to absolute URLs
toAppUrl('/api/bookings')
// "https://example.com/api/bookings"

toAppUrl('images/logo.png')
// "https://example.com/images/logo.png"`} language="typescript" />

        <h3>DTO Type Name</h3>
        <CodeBlock code={`const { getTypeName } = useUtils()

const request = new QueryBookings()
const typeName = getTypeName(request)
// "QueryBookings"

// Useful for dynamic metadata lookups
const { typeOf } = useMetadata()
const metaType = typeOf(getTypeName(request))`} language="typescript" />

        <h3>Focus Management</h3>
        <CodeBlock code={`const { focusNextElement } = useUtils()

function MyForm() {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      focusNextElement()
    }
  }
  
  return (
    <form>
      <input onKeyPress={handleKeyPress} placeholder="First" />
      <input onKeyPress={handleKeyPress} placeholder="Second" />
      <input onKeyPress={handleKeyPress} placeholder="Third" />
    </form>
  )
}`} language="tsx" />

        <h3>Ref Utilities</h3>
        <CodeBlock code={`const { setRef, unRefs } = useUtils()

// Force trigger updates by double-setting a ref
const myRef = useRef({ count: 0 })
setRef(myRef, { count: 1 })

// Unwrap all refs in an object
const dto = {
  name: useRef('John'),
  age: useRef(30),
  email: 'john@example.com'
}

const unwrapped = unRefs(dto)
// { name: 'John', age: 30, email: 'john@example.com' }`} language="typescript" />

        <h3>Tailwind Transitions</h3>
        <CodeBlock code={`const { transition } = useUtils()

function FadeInOut({ show }) {
  const [transitionClass, setTransitionClass] = useState('')
  
  useEffect(() => {
    transition(
      {
        entering: { cls: 'transition ease-out duration-100', from: 'opacity-0', to: 'opacity-100' },
        leaving: { cls: 'transition ease-in duration-75', from: 'opacity-100', to: 'opacity-0' }
      },
      { current: transitionClass },
      show
    )
  }, [show])
  
  return (
    <div className={transitionClass}>
      Content
    </div>
  )
}`} language="tsx" />

        <h2>TypeScript Definition</h2>
        <CodeBlock code={`/** Format Date into required input[type=date] format */
function dateInputFormat(d: Date): string;

/** Format TimeSpan or Date into required input[type=time] format */
function timeInputFormat(s?: string | number | Date | null): string;

/** Double set reactive Ref<T> to force triggering updates */
function setRef($ref: Ref<any>, value: any): void;

/** Returns a dto with all Refs unwrapped */
function unRefs(o: any): any;

/** Update reactive transition class based on Tailwind animation transition rule-set */
function transition(rule: TransitionRules, transition: Ref<string>, show: boolean): void;

/** Set focus to the next element inside a HTML Form */
function focusNextElement(): void;

/** Resolve Request DTO name from a Request DTO instance */
function getTypeName(dto: any): any;

/** HTML Tag builder */
function htmlTag(tag: string, child?: string, attrs?: any): string;

/** Convert object dictionary into encoded HTML attributes */
function htmlAttrs(attrs: any): string;

/** Convert HTML Anchor attributes into encoded HTML attributes */
function linkAttrs(attrs: {
  href: string;
  cls?: string;
  target?: string;
  rel?: string;
}): any;

/** Resolve Absolute URL from relative path */
function toAppUrl(url: string): string | undefined;

/** Check if value is a scalar type */
function isPrimitive(value: any): boolean;

/** Check if value is a non-scalar type */
function isComplexType(value: any): boolean;`} language="tsx" />
      </div>
    </GalleryLayout>
  )
}


import { useState, useEffect, memo } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { TextInput, DynamicInput } from '@servicestack/react'
import { registerComponent } from '@servicestack/react'
import type { InputInfo } from '@servicestack/react'

// Custom Phone Input Component
function PhoneInput({ id, value, onChange, label, placeholder, help, className, inputClass, labelClass, status }: any) {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const formatPhone = (val: string) => {
    // Remove all non-digits
    const cleaned = val.replace(/\D/g, '')

    // Limit to 10 digits
    const limited = cleaned.substring(0, 10)

    // Format progressively as user types
    if (limited.length <= 3) {
      return limited
    } else if (limited.length <= 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
    } else {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
    }
  }

  const handleChange = (newValue: string | number) => {
    const formatted = formatPhone(String(newValue))
    setLocalValue(formatted)
    onChange?.(formatted)
  }

  return (
    <TextInput
      type="text"
      id={id}
      value={localValue}
      onChange={handleChange as any}
      label={label}
      placeholder={placeholder || "(123) 456-7890"}
      help={help}
      className={className}
      inputClass={inputClass}
      labelClass={labelClass}
      status={status}
    />
  )
}

// Custom Color Picker Input
function ColorPickerInput({ id, value, onChange, label, help, className, labelClass }: any) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={labelClass || "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"}>
          {label}
        </label>
      )}
      <div className="flex gap-2 items-center">
        <input
          type="color"
          id={id}
          value={value || '#3b82f6'}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
        />
        <input
          type="text"
          value={value || '#3b82f6'}
          onChange={(e) => onChange?.(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="#3b82f6"
        />
      </div>
      {help && (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
          {help}
        </p>
      )}
    </div>
  )
}

// Custom Slider Input
function SliderInput({ id, value, onChange, label, help, min = 0, max = 100, step = 1, className, labelClass }: any) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={labelClass || "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"}>
          {label}
        </label>
      )}
      <div className="flex gap-4 items-center">
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
          {value || min}
        </span>
      </div>
      {help && (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
          {help}
        </p>
      )}
    </div>
  )
}

// Memoized example components with internal state to prevent page re-renders
const PhoneInputExample = memo(() => {
  const [phone, setPhone] = useState('')

  return (
    <CodeExample
    title="Phone Input with Auto-Formatting"
    description="A custom input that automatically formats phone numbers as (123) 456-7890"
    code={`function PhoneInput({ id, value, onChange, ...props }) {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const formatPhone = (val) => {
    // Remove all non-digits
    const cleaned = val.replace(/\\D/g, '')

    // Limit to 10 digits
    const limited = cleaned.substring(0, 10)

    // Format progressively as user types
    if (limited.length <= 3) {
      return limited
    } else if (limited.length <= 6) {
      return \`(\${limited.slice(0, 3)}) \${limited.slice(3)}\`
    } else {
      return \`(\${limited.slice(0, 3)}) \${limited.slice(3, 6)}-\${limited.slice(6)}\`
    }
  }

  const handleChange = (newValue) => {
    const formatted = formatPhone(newValue)
    setLocalValue(formatted)
    onChange?.(formatted)
  }

  return (
    <TextInput
      id={id}
      value={localValue}
      onChange={handleChange}
      placeholder="(123) 456-7890"
      {...props}
    />
  )
}`}
  >
    <div className="max-w-md">
      <PhoneInput
        id="phone"
        label="Phone Number"
        value={phone}
        onChange={setPhone}
        help="Enter 10 digits and it will auto-format"
      />
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
        <strong>Value:</strong> {phone || '(empty)'}
      </div>
    </div>
  </CodeExample>
  )
})

const ColorPickerExample = memo(() => {
  const [color, setColor] = useState('#3b82f6')

  return (
    <CodeExample
      title="Color Picker Input"
      description="A custom input combining a color picker with a text input for hex values"
      code={`function ColorPickerInput({ id, value, onChange, label, help }) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="flex gap-2 items-center">
        <input
          type="color"
          id={id}
          value={value || '#3b82f6'}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-10 w-20 rounded border cursor-pointer"
        />
        <input
          type="text"
          value={value || '#3b82f6'}
          onChange={(e) => onChange?.(e.target.value)}
          className="flex-1 rounded-md border shadow-sm"
          placeholder="#3b82f6"
        />
      </div>
      {help && <p className="text-sm text-gray-500">{help}</p>}
    </div>
  )
}`}
    >
      <div className="max-w-md">
        <ColorPickerInput
          id="color"
          label="Brand Color"
          value={color}
          onChange={setColor}
          help="Pick a color or enter a hex value"
        />
        <div className="mt-4 p-4 rounded" style={{ backgroundColor: color }}>
          <p className="text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            Preview: {color}
          </p>
        </div>
      </div>
    </CodeExample>
  )
})

const SliderInputExample = memo(() => {
  const [volume, setVolume] = useState(50)

  return (
    <CodeExample
      title="Slider Input"
      description="A custom range slider input with live value display"
      code={`function SliderInput({ id, value, onChange, label, help, min = 0, max = 100, step = 1 }) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="flex gap-4 items-center">
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg cursor-pointer"
        />
        <span className="w-12 text-right">{value || min}</span>
      </div>
      {help && <p className="text-sm text-gray-500">{help}</p>}
    </div>
  )
}`}
    >
      <div className="max-w-md">
        <SliderInput
          id="volume"
          label="Volume"
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          step={5}
          help="Adjust the volume level"
        />
        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
          <strong>Value:</strong> {volume}%
        </div>
      </div>
    </CodeExample>
  )
})

export default function CustomInputsPage() {
  const [dynamicModel, setDynamicModel] = useState({ phone: '', color: '#10b981', volume: 75 })

  // Register custom components on mount
  useEffect(() => {
    registerComponent('PhoneInput', PhoneInput)
    registerComponent('ColorPickerInput', ColorPickerInput)
    registerComponent('SliderInput', SliderInput)
  }, [])

  return (
    <GalleryLayout title="Custom Input Components">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          In addition to all the built-in{' '}
          <a href="/gallery/form-inputs" className="text-blue-600 dark:text-blue-400 hover:underline">Input Components</a>,
          AutoForm components bound to your declarative Request DTOs can also reference your own custom React input components.
        </p>

        <p>
          This allows you to continue benefiting from the rapid development workflow enabled by AutoForm components whilst
          also being able to deliver the most optimal UX when you need to.
        </p>

        <h2>Live Examples</h2>

        <PhoneInputExample />

        <ColorPickerExample />

        <SliderInputExample />

        <CodeExample
          title="Using Registered Components with DynamicInput"
          description="Once registered, custom components can be used by DynamicInput and AutoForm"
          code={`// Register components (typically in app setup)
registerComponent('PhoneInput', PhoneInput)
registerComponent('ColorPickerInput', ColorPickerInput)
registerComponent('SliderInput', SliderInput)

// Define inputs that reference custom components
const phoneInput: InputInfo = {
  id: 'phone',
  type: 'PhoneInput',
  label: 'Phone Number',
  help: 'Auto-formats as you type'
}

const colorInput: InputInfo = {
  id: 'color',
  type: 'ColorPickerInput',
  label: 'Theme Color'
}

const volumeInput: InputInfo = {
  id: 'volume',
  type: 'SliderInput',
  label: 'Volume Level',
  min: '0',
  max: '100',
  step: 5
}

// DynamicInput will automatically render the registered components
<DynamicInput input={phoneInput} value={model} onChange={setModel} />
<DynamicInput input={colorInput} value={model} onChange={setModel} />
<DynamicInput input={volumeInput} value={model} onChange={setModel} />`}
        >
          <div className="max-w-md space-y-4">
            <DynamicInput
              input={{
                id: 'phone',
                type: 'PhoneInput',
                label: 'Phone Number',
                help: 'Auto-formats as you type'
              } as InputInfo}
              value={dynamicModel as any}
              onChange={setDynamicModel}
              api={null}
            />
            <DynamicInput
              input={{
                id: 'color',
                type: 'ColorPickerInput',
                label: 'Theme Color',
                help: 'Pick your brand color'
              } as InputInfo}
              value={dynamicModel as any}
              onChange={setDynamicModel}
              api={null}
            />
            <DynamicInput
              input={{
                id: 'volume',
                type: 'SliderInput',
                label: 'Volume Level',
                min: '0',
                max: '100',
                step: 5
              } as InputInfo}
              value={dynamicModel as any}
              onChange={setDynamicModel}
              api={null}
            />
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              <strong>Model:</strong>
              <pre className="mt-2">{JSON.stringify(dynamicModel, null, 2)}</pre>
            </div>
          </div>
        </CodeExample>

        <h2>Creating Custom Input Components</h2>
        <p>
          Custom input components should follow the same interface as built-in components:
        </p>
        <CodeBlock code={`interface CustomInputProps {
  id: string
  value?: any
  onChange?: (value: any) => void
  status?: ResponseStatus  // Error state from API
  label?: string
  placeholder?: string
  help?: string
  disabled?: boolean
  className?: string       // Wrapper class
  inputClass?: string      // Input element class
  labelClass?: string      // Label element class
  // ... other standard input props
}

function CustomInput({ id, value, onChange, ...props }: CustomInputProps) {
  return (
    <div>
      {props.label && <label htmlFor={id}>{props.label}</label>}
      <input
        id={id}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
    </div>
  )
}`} language="typescript" />

        <h2>Example: Email Input with Autocomplete</h2>
        <p>
          Here's an example of a custom EmailInput component that provides autocomplete functionality:
        </p>
        <CodeBlock code={`import { useState, useEffect } from 'react'
import { TextInput } from '@servicestack/react'

function EmailAutocomplete({ value, onChange }) {
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (value && value.length > 2) {
      // Fetch email suggestions from API
      fetchEmailSuggestions(value).then(setSuggestions)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [value])

  const handleSelect = (email) => {
    onChange(email)
    setShowDropdown(false)
  }

  return (
    <div className="relative">
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white dark:bg-gray-800
                        border border-gray-300 dark:border-gray-600
                        rounded-md shadow-lg mt-1">
          {suggestions.map((email, i) => (
            <div
              key={i}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700
                         cursor-pointer"
              onClick={() => handleSelect(email)}
            >
              {email}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function EmailInput(props) {
  return (
    <TextInput {...props}>
      <EmailAutocomplete
        value={props.value}
        onChange={props.onChange}
      />
    </TextInput>
  )
}`} language="tsx" />

        <h2>Registering Custom Components</h2>
        <p>
          To make custom components available globally to DynamicInput and AutoForm, register them using the <code>registerComponent</code> function:
        </p>
        <CodeBlock code={`import { registerComponent, registerComponents } from '@servicestack/react'
import { PhoneInput } from './components/PhoneInput'
import { ColorPickerInput } from './components/ColorPickerInput'
import { SliderInput } from './components/SliderInput'

// Register a single component
registerComponent('PhoneInput', PhoneInput)
registerComponent('ColorPickerInput', ColorPickerInput)

// Or register multiple components at once
registerComponents({
  PhoneInput,
  ColorPickerInput,
  SliderInput,
})

// Now they can be used in DTOs with [Input(Type="...")]
// and will be automatically rendered by DynamicInput`} language="typescript" />

        <p className="mt-4">
          Alternatively, you can pass components directly to AutoForm:
        </p>
        <CodeBlock code={`// Pass components directly to AutoForm
<AutoForm
  type="MyRequest"
  components={{
    PhoneInput,
    ColorPickerInput,
  }}
/>`} language="tsx" />

        <h2>Using Custom Inputs in DTOs</h2>
        <p>
          Once registered, custom components can be declaratively used with the <code>[Input(Type)]</code> attribute:
        </p>
        <CodeBlock code={`public class SendEmail : IReturn<MailMessage>
{
    [ValidateNotEmpty]
    [Input(Type="EmailInput")]
    public string Email { get; set; }

    [ValidateNotEmpty]
    [FieldCss(Field = "col-span-12")]
    public string Subject { get; set; }

    [ValidateNotEmpty]
    [Input(Type="MarkdownInput", Label="")]
    [FieldCss(Field="col-span-12", Input="h-56")]
    public string? Body { get; set; }
}`} language="csharp" />

        <h2>Extending Built-in Components</h2>
        <p>
          You can also extend built-in components to add custom functionality:
        </p>
        <CodeBlock code={`import { useState, useEffect } from 'react'
import { TextInput } from '@servicestack/react'

function PhoneInput(props) {
  const [localValue, setLocalValue] = useState(props.value || '')

  useEffect(() => {
    setLocalValue(props.value || '')
  }, [props.value])

  const formatPhone = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\\D/g, '')

    // Limit to 10 digits
    const limited = cleaned.substring(0, 10)

    // Format progressively as user types
    if (limited.length <= 3) {
      return limited
    } else if (limited.length <= 6) {
      return \`(\${limited.slice(0, 3)}) \${limited.slice(3)}\`
    } else {
      return \`(\${limited.slice(0, 3)}) \${limited.slice(3, 6)}-\${limited.slice(6)}\`
    }
  }

  const handleChange = (value) => {
    const formatted = formatPhone(value)
    setLocalValue(formatted)
    props.onChange?.(formatted)
  }

  return (
    <TextInput
      {...props}
      value={localValue}
      onChange={handleChange}
      placeholder="(123) 456-7890"
    />
  )
}`} language="tsx" />

        <h2>Custom Input with Validation</h2>
        <p>
          Custom inputs automatically integrate with ServiceStack's validation:
        </p>
        <CodeBlock code={`function CreditCardInput({ id, value, onChange, error }) {
  const [cardType, setCardType] = useState('')

  const detectCardType = (number) => {
    if (/^4/.test(number)) return 'Visa'
    if (/^5[1-5]/.test(number)) return 'Mastercard'
    if (/^3[47]/.test(number)) return 'Amex'
    return ''
  }

  const handleChange = (e) => {
    const value = e.target.value
    setCardType(detectCardType(value))
    onChange?.(value)
  }

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          value={value || ''}
          onChange={handleChange}
          className={\`form-input \${error ? 'border-red-500' : ''}\`}
          placeholder="1234 5678 9012 3456"
        />
        {cardType && (
          <span className="absolute right-3 top-2 text-gray-500">
            {cardType}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}`} language="tsx" />

        <h2>Benefits</h2>
        <ul>
          <li><strong>Optimal UX</strong> - Create the perfect user experience for your specific needs</li>
          <li><strong>Reusability</strong> - Use custom components across multiple forms</li>
          <li><strong>Type Safety</strong> - Full TypeScript support</li>
          <li><strong>Validation</strong> - Automatic integration with server-side validation</li>
          <li><strong>Declarative</strong> - Continue using ServiceStack's declarative DTO approach</li>
        </ul>

        <h2>See Also</h2>
        <ul>
          <li><a href="/gallery/form-inputs" className="text-blue-600 dark:text-blue-400 hover:underline">Form Inputs</a> - Built-in input components</li>
          <li><a href="/gallery/autoform" className="text-blue-600 dark:text-blue-400 hover:underline">Auto Forms</a> - AutoForm components</li>
          <li><a href="/gallery/custom-autoforms" className="text-blue-600 dark:text-blue-400 hover:underline">Custom Auto Forms</a> - Custom AutoQuery implementations</li>
        </ul>
      </div>
    </GalleryLayout>
  )
}


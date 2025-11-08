import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { AutoForm, AutoCreateForm, AutoEditForm, HtmlFormat, TextLink } from '@servicestack/react'
import { GalleryProvider } from '../context'
import { bookings } from '../data'

function AutoFormContent() {
  const [results, setResults] = useState<any>(null)
  const [request, setRequest] = useState<any>({ skip: 1, take: 2, orderBy: 'Name' })
  const [booking] = useState(bookings[0])

  const onSuccess = (response: any) => {
    setResults(response.results || response)
  }

  return (
    <GalleryLayout title="Auto Form Components">
      <CodeExample
        title="AutoForm"
        description="The AutoForm component is a generic form component that can be used to create and wire a traditional Form for any Request DTO definition where successful responses can be handled with the onSuccess event:"
        code={`<AutoForm type="QueryBookings" onSuccess={onSuccess} />
{results && (
  <div>
    <h3 className="py-4 text-2xl">Results</h3>
    <HtmlFormat value={results} />
  </div>
)}`}
      >
        <AutoForm
          panelClass="mx-auto max-w-3xl"
          type="QueryBookings"
          onSuccess={onSuccess}
        />
        {results && (
          <div>
            <h3 className="py-4 text-2xl">Results</h3>
            <HtmlFormat value={results} />
          </div>
        )}
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none my-8">
        <p>
          These Auto Form components are customizable with the declarative C# UI Attributes where you can 
          override the form's <strong>heading</strong> with <code>[Description]</code> and include a <strong>subHeading</strong> with <code>[Notes]</code> which supports rich HTML markup.
        </p>

        <h3>AutoForm Properties</h3>
        <p>Alternatively they can be specified in the components properties:</p>
        <CodeBlock code={`interface AutoFormProps {
  type: string | InstanceType<any> | Function
  modelValue?: ApiRequest | any
  heading?: string
  subHeading?: string
  showLoading?: boolean
  jsconfig?: string         //= eccn,edv
  configureField?: (field: InputProp) => void

  /* Default Styles */
  formClass?: string        //= shadow sm:rounded-md
  innerFormClass?: string
  bodyClass?: string
  headerClass?: string      //= p-6
  buttonsClass?: string     //= mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex justify-between
  headingClass?: string     //= text-lg font-medium leading-6 text-gray-900 dark:text-gray-100
  subHeadingClass?: string
  submitLabel?: string      //= Submit
}`} language="typescript" />

        <p>
          Both <code>onSuccess</code> and <code>onError</code> events are fired after each API call, although built-in validation binding means it's typically unnecessary to manually handle error responses.
        </p>
      </div>

      <CodeExample
        title="Model Binding"
        description="Forms can be bound to a Request DTO model where it can be used to pre-populate the Forms default values:"
        code={`const [request, setRequest] = useState({ skip: 1, take: 2, orderBy: 'Name' })

<AutoForm 
  value={request} 
  onChange={setRequest}
  type="QueryBookings" 
/>`}
      >
        <AutoForm
          panelClass="mx-auto max-w-3xl"
          value={request}
          onChange={setRequest}
          type="QueryBookings"
        />
      </CodeExample>

      <CodeExample
        title="Create Form"
        description="AutoCreateForm can be used to create an automated form based on a AutoQuery CRUD Create Request DTO definition which can be rendered in a traditional inline Form with card formStyle option:"
        code={`<AutoCreateForm type="CreateBooking" formStyle="card" />`}
      >
        <AutoCreateForm
          panelClass="mx-auto max-w-3xl"
          type="CreateBooking"
          formStyle="card"
        />
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none my-8">
        <p>
          By default Auto Forms are rendered in a <code>SlideOver</code> dialog. These Auto Forms are powered by the rich App Metadata surrounding your APIs, which contain all the necessary metadata to invoke the API and bind any contextual validation errors adjacent to the invalid field inputs.
        </p>
      </div>

      <CodeExample
        title="Edit Form"
        description="AutoEditForm can be used to render an automated form based on Update and Delete AutoQuery CRUD APIs which also makes use of heading and sub-heading customization options:"
        code={`<AutoEditForm 
  value={booking} 
  type="UpdateBooking" 
  deleteType="DeleteBooking" 
  heading="Change an existing Room Booking" 
  subHeading="Manage reservations for MyApp hotels." 
/>`}
      >
        <AutoEditForm
          panelClass="mx-auto max-w-3xl"
          value={booking}
          type="UpdateBooking"
          deleteType="DeleteBooking"
          heading="Change an existing Room Booking"
          subHeading="Manage reservations for MyApp hotels."
          formStyle="card"
        />
      </CodeExample>

      <CodeExample
        title="Edit Form with Custom Slots"
        description="The same form rendered with custom heading and sub-heading slots using rich markup:"
        code={`<AutoEditForm 
  value={booking} 
  formStyle="card" 
  type="UpdateBooking" 
  deleteType="DeleteBooking"
>
  <div slot="heading">
    <h3 className="text-xl font-semibold text-green-600">
      Change an existing Room Booking
    </h3>
  </div>
  <div slot="sub-heading">
    <p>
      Here are some{' '}
      <TextLink href="https://youtu.be/rSFiikDjGos">
        good tips on making room reservations
        <Icon className="inline-block" type="ExternalLink" />
      </TextLink>
    </p>
  </div>
</AutoEditForm>`}
      >
        <AutoEditForm
          panelClass="mx-auto max-w-3xl mb-4"
          value={booking}
          formStyle="card"
          type="UpdateBooking"
          deleteType="DeleteBooking"
        >
          <div slot="heading">
            <h3 className="text-xl font-semibold text-green-600">
              Change an existing Room Booking
            </h3>
          </div>
          <div slot="sub-heading">
            <p>
              Here are some{' '}
              <TextLink href="https://youtu.be/rSFiikDjGos">
                good tips on making room reservations
                <svg className="inline-block w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/>
                </svg>
              </TextLink>
            </p>
          </div>
        </AutoEditForm>
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mt-12">
        <h2>Customization with C# Attributes</h2>
        <p>
          The forms behavior and appearance is further customizable with the API annotation, declarative validation and the custom Field and Input attributes:
        </p>
        <CodeBlock code={`[Description("Update an existing Booking")]
[Notes("Find out how to create a <a href='https://youtu.be/rSFiikDjGos'>C# Bookings App from Scratch</a>")]
[Route("/booking/{Id}", "PATCH")]
[ValidateHasRole("Employee")]
[AutoApply(Behavior.AuditModify)]
public class UpdateBooking : IPatchDb<Booking>, IReturn<IdResponse>
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public RoomType? RoomType { get; set; }
    [ValidateGreaterThan(0)]
    public int? RoomNumber { get; set; }
    [ValidateGreaterThan(0)]
    public decimal? Cost { get; set; }
    public DateTime? BookingStartDate { get; set; }
    public DateTime? BookingEndDate { get; set; }
    [Input(Type = "textarea")]
    public string? Notes { get; set; }
    public string? CouponId { get; set; }
    public bool? Cancelled { get; set; }
}`} language="csharp" />
      </div>
    </GalleryLayout>
  )
}

export default function AutoFormPage() {
  return (
    <GalleryProvider>
      <AutoFormContent />
    </GalleryProvider>
  )
}


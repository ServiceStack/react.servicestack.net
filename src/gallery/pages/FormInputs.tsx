import { useState, useEffect } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import ErrorBoundary from '../components/ErrorBoundary'
import {
  TextInput,
  SelectInput,
  TextareaInput,
  ErrorSummary,
  PrimaryButton,
  ConfirmDelete
} from '@servicestack/react'
import { useMetadata } from '@servicestack/react'
import { useAuth } from '@servicestack/react'
import { getFreshBookings } from '../data'

function BookingsForm({ id }: { id: number }) {
  const { enumOptions, metadataApi } = useMetadata()
  const { hasRole } = useAuth()
  const [request, setRequest] = useState<any>({
    id,
    name: '',
    roomType: '',
    roomNumber: 0,
    cost: 0,
    bookingStartDate: '',
    bookingEndDate: '',
    notes: ''
  })

  useEffect(() => {
    // Load booking data - get fresh data to avoid mutation issues
    const freshBookings = getFreshBookings()
    const booking = freshBookings.find(b => b.id === id)
    if (booking) {
      console.log('Booking data:', booking)
      console.log('bookingStartDate type:', typeof booking.bookingStartDate, booking.bookingStartDate)
      console.log('bookingEndDate type:', typeof booking.bookingEndDate, booking.bookingEndDate)
      console.log('bookingStartDate instanceof Date:', booking.bookingStartDate instanceof Date)
      console.log('bookingStartDate constructor:', booking.bookingStartDate?.constructor?.name)

      // Helper function to convert Date or string to ISO date string
      const toDateString = (date: any) => {
        if (!date) return ''

        // If it's already a string, extract date part
        if (typeof date === 'string') {
          return date.split('T')[0]
        }

        // If it's a Date object, convert it
        if (date instanceof Date && !isNaN(date.getTime())) {
          return date.toISOString().split('T')[0]
        }

        // If it's a number (timestamp), convert it
        if (typeof date === 'number') {
          return new Date(date).toISOString().split('T')[0]
        }

        // If it's an object (possibly corrupted Date), return empty
        if (typeof date === 'object') {
          console.error('Date is an object but not a valid Date:', date)
          return ''
        }

        // Try to create a Date from whatever it is
        try {
          const newDate = new Date(date)
          if (!isNaN(newDate.getTime())) {
            return newDate.toISOString().split('T')[0]
          }
          return ''
        } catch (e) {
          console.error('Could not convert date:', date, e)
          return ''
        }
      }

      setRequest({
        id: booking.id,
        name: booking.name,
        roomType: booking.roomType,
        roomNumber: booking.roomNumber,
        cost: booking.cost,
        bookingStartDate: toDateString(booking.bookingStartDate),
        bookingEndDate: toDateString(booking.bookingEndDate),
        notes: ''
      })
    }
  }, [id])

  // Don't render until metadata is loaded
  if (!metadataApi) {
    return <div className="p-4">Loading metadata...</div>
  }

  // Get enum options safely
  let roomTypeOptions: any = {}
  try {
    roomTypeOptions = enumOptions('RoomType') || {}
  } catch (e) {
    console.error('Error getting enum options:', e)
    return <div className="p-4 text-red-600">Error loading form metadata</div>
  }

  const visibleFields = "name,roomType,roomNumber,bookingStartDate,bookingEndDate,cost,notes"
  const canDelete = hasRole('Manager')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', request)
    // In a real app, you'd call: await client.api(new UpdateBooking(request))
  }

  const onDelete = async () => {
    console.log('Deleting booking:', id)
    // In a real app, you'd call: await client.apiVoid(new DeleteBooking({ id }))
  }

  const updateField = (field: string, value: any) => {
    setRequest({ ...request, [field]: value })
  }

  return (
    <form onSubmit={submit}>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 py-6 px-4 sm:p-6 bg-white dark:bg-black">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              Update an existing Booking
            </h3>
          </div>
          <fieldset>
            <ErrorSummary except={visibleFields} className="mb-4" />
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  id="name"
                  value={request.name}
                  onChange={(value) => updateField('name', value)}
                  placeholder="Name for this booking"
                  {...{ required: true } as any}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <SelectInput
                  id="roomType"
                  value={request.roomType}
                  onChange={(value) => updateField('roomType', value)}
                  options={roomTypeOptions}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  type="number"
                  id="roomNumber"
                  value={request.roomNumber}
                  onChange={(value) => updateField('roomNumber', value)}
                  {...{ min: 0, required: true } as any}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  type="number"
                  id="cost"
                  value={request.cost}
                  onChange={(value) => updateField('cost', value)}
                  {...{ min: 0, required: true } as any}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  type="date"
                  id="bookingStartDate"
                  value={request.bookingStartDate}
                  onChange={(value) => updateField('bookingStartDate', value)}
                  {...{ required: true } as any}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput 
                  type="date" 
                  id="bookingEndDate" 
                  value={request.bookingEndDate}
                  onChange={(value) => updateField('bookingEndDate', value)}
                />
              </div>
              <div className="col-span-6">
                <TextareaInput 
                  id="notes" 
                  value={request.notes}
                  onChange={(value) => updateField('notes', value)}
                  placeholder="Notes about this booking" 
                  className="h-24" 
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-4 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right sm:px-12">
          <div className="flex justify-between space-x-3">
            <div>
              {canDelete && (
                <ConfirmDelete onDelete={onDelete}>Delete</ConfirmDelete>
              )}
            </div>
            <div>
              <PrimaryButton onClick={submit as any}>Update Booking</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

function FormInputsContent() {
  return (
    <GalleryLayout title="Form Inputs Components">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>
          The <code>TextInput</code>, <code>SelectInput</code>, <code>CheckboxInput</code> and <code>TextareaInput</code> contains the most popular
          Input controls used by C# POCOs which can be bound directly to Request DTOs and includes support for
          declarative and Fluent Validation binding.
        </p>
      </div>

      <CodeExample
        title="Bookings Form"
        description="A complete form example using various input components with validation support:"
        code={`<form onSubmit={submit}>
  <div className="shadow sm:overflow-hidden sm:rounded-md">
    <div className="space-y-6 py-6 px-4 sm:p-6 bg-white dark:bg-black">
      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
        Update an existing Booking
      </h3>
      <fieldset>
        <ErrorSummary except={visibleFields} className="mb-4" />
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <TextInput 
              id="name" 
              value={request.name}
              onChange={(value) => updateField('name', value)}
              required 
              placeholder="Name for this booking" 
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <SelectInput 
              id="roomType" 
              value={request.roomType}
              onChange={(value) => updateField('roomType', value)}
              options={enumOptions('RoomType')}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <TextInput 
              type="number" 
              id="roomNumber" 
              value={request.roomNumber}
              onChange={(value) => updateField('roomNumber', value)}
              min={0}
              required 
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <TextInput 
              type="number" 
              id="cost" 
              value={request.cost}
              onChange={(value) => updateField('cost', value)}
              min={0}
              required 
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <TextInput 
              type="date" 
              id="bookingStartDate" 
              value={request.bookingStartDate}
              onChange={(value) => updateField('bookingStartDate', value)}
              required 
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <TextInput 
              type="date" 
              id="bookingEndDate" 
              value={request.bookingEndDate}
              onChange={(value) => updateField('bookingEndDate', value)}
            />
          </div>
          <div className="col-span-6">
            <TextareaInput 
              id="notes" 
              value={request.notes}
              onChange={(value) => updateField('notes', value)}
              placeholder="Notes about this booking" 
              className="h-24" 
            />
          </div>
        </div>
      </fieldset>
    </div>
    <div className="mt-4 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right sm:px-12">
      <div className="flex justify-between space-x-3">
        <div>
          {canDelete && (
            <ConfirmDelete onDelete={onDelete}>Delete</ConfirmDelete>
          )}
        </div>
        <div>
          <PrimaryButton onClick={submit}>Update Booking</PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</form>`}
      >
        <ErrorBoundary>
          <BookingsForm id={1} />
        </ErrorBoundary>
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mt-12">
        <h2>Form Wiring</h2>
        <p>
          The form can be wired up to handle querying, updating and deleting including limiting functionality to authorized users:
        </p>
        <CodeBlock code={`import { useMetadata, useAuth, useClient } from '@servicestack/react'

const { enumOptions, toFormValues } = useMetadata()
const { hasRole } = useAuth()
const client = useClient()

const canDelete = hasRole('Manager')

// Load booking data
useEffect(() => {
  const api = await client.api(new QueryBookings({ id }))
  if (api.succeeded) {
    setRequest(new UpdateBooking(toFormValues(api.response?.results[0])))
  }
}, [id])

// Submit handler
const submit = async (e: React.FormEvent) => {
  e.preventDefault()
  const api = await client.api(request)
  if (api.succeeded) close()
}

// Delete handler
const onDelete = async () => {
  const api = await client.apiVoid(new DeleteBooking({ id }))
  if (api.succeeded) close()
}`} language="typescript" />

        <p>
          This also shows how we can utilize <code>enumOptions</code> from our App Metadata to populate select drop downs from C# enums.
        </p>
      </div>
    </GalleryLayout>
  )
}

export default function FormInputsPage() {
  return <FormInputsContent />
}


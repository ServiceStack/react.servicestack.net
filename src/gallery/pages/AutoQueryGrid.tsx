import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { AutoQueryGrid, AutoEditForm, Icon, TextLink, PreviewFormat } from '@servicestack/react'
import { useFormatters } from '@servicestack/react'
import { GalleryProvider } from '../context'

// Custom Responsive Component
function ResponsiveExample() {
  const { currency } = useFormatters()

  return (
    <AutoQueryGrid 
      type="Booking" 
      visibleFrom={{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl', createdBy:'2xl' }}
      columnSlots={{
        id: ({ id }: any) => <span className="text-gray-900">{id}</span>,
        name: ({ name }: any) => name,
        cost: ({ cost }: any) => <span dangerouslySetInnerHTML={{ __html: currency(cost) }} />,
        createdBy: ({ createdBy }: any) => createdBy
      }}
      headerSlots={{
        'roomNumber-header': () => <><span className="hidden lg:inline">Room </span>No</>,
        'bookingStartDate-header': () => <>Start<span className="hidden lg:inline"> Date</span></>,
        'bookingEndDate-header': () => <>End<span className="hidden lg:inline"> Date</span></>,
        'createdBy-header': () => <>Employee</>
      }}
    />
  )
}

// Custom Booking with Coupon Management
function CustomBookingExample() {
  const [coupon, setCoupon] = useState<any>(null)

  const showCoupon = async (id: string) => {
    // In a real app, you'd query for the coupon
    // For now, we'll just set a mock coupon
    setCoupon({ id, description: 'Sample Coupon', discount: 10 })
  }

  const close = () => setCoupon(null)

  return (
    <div>
      <AutoQueryGrid 
        type="Booking" 
        selectedColumns={['id','name','cost','bookingStartDate','bookingEndDate','discount']}
        columnSlots={{
          discount: ({ discount }: any) => (
            discount ? (
              <TextLink 
                className="flex items-end" 
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  showCoupon(discount.id)
                }} 
                title={discount.id}
              >
                <Icon className="w-5 h-5 mr-1" type="Coupon" />
                <PreviewFormat value={discount.description} />
              </TextLink>
            ) : null
          )
        }}
      />
      {coupon && (
        <AutoEditForm 
          type="UpdateCoupon" 
          value={coupon} 
          onDone={close} 
          onSave={close} 
        />
      )}
    </div>
  )
}

function AutoQueryGridContent() {
  return (
    <GalleryLayout title="AutoQueryGrid Component">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-lg">
          AutoQueryGrid is a powerful component that provides a complete CRUD interface for your ServiceStack AutoQuery APIs.
        </p>
      </div>

      <CodeExample
        title="Default CRUD"
        description="By default you can create an AutoQueryGrid that allows authorized users the ability to Create, Read, Update & Delete records with just the DataModel:"
        code={`<AutoQueryGrid type="Booking" />`}
      >
        <AutoQueryGrid type="Booking" />
      </CodeExample>

      <CodeExample
        title="Read Only"
        description="You can use apis to limit which AutoQuery APIs AutoQueryGrid should use, so if only the AutoQuery DTO is provided, the AutoQueryGrid will only be browsable in read-only mode:"
        code={`<AutoQueryGrid type="Booking" apis="QueryBookings" />`}
      >
        <AutoQueryGrid type="Booking" apis="QueryBookings" />
      </CodeExample>

      <CodeExample
        title="Table Styles"
        description="The same DataGrid Table Styles can also be used to style AutoQueryGrid:"
        code={`<AutoQueryGrid type="Booking" tableStyle="verticalLines,uppercaseHeadings" />`}
      >
        <AutoQueryGrid type="Booking" tableStyle="verticalLines,uppercaseHeadings" />
      </CodeExample>

      <CodeExample
        title="Custom AutoQueryGrid"
        description="Different AutoQueryGrid features can be hidden with hide and functionality disabled with deny:"
        code={`<AutoQueryGrid 
  type="Booking" 
  hide="pagingNav,copyApiUrl,downloadCsv" 
  deny="filtering" 
/>`}
      >
        <AutoQueryGrid 
          type="Booking" 
          hide="pagingNav,copyApiUrl,downloadCsv" 
          deny="filtering" 
        />
      </CodeExample>

      <CodeExample
        title="Limit Columns"
        description="By default AutoQueryGrid displays all public properties returned in its AutoQuery API which can be further limited with selectedColumns:"
        code={`<AutoQueryGrid 
  type="Booking" 
  selectedColumns={['id','name','roomType','roomNumber','cost']} 
/>`}
      >
        <AutoQueryGrid 
          type="Booking" 
          selectedColumns={['id','name','roomType','roomNumber','cost']} 
        />
      </CodeExample>

      <CodeExample
        title="Simple Responsive Columns"
        description="Using visibleFrom is a simple way to enable a responsive DataGrid by specifying at which Tailwind breakpoints columns should be visible from and headerTitles to use friendlier aliases for different columns:"
        code={`<AutoQueryGrid 
  type="Booking" 
  selectedColumns={['id','name','roomType','roomNumber','cost','bookingStartDate','bookingEndDate']}
  headerTitles={{ roomNumber:'Room', bookingStartDate:'Start', bookingEndDate:'End' }}
  visibleFrom={{ bookingStartDate:'lg', bookingEndDate:'xl' }}
/>`}
      >
        <AutoQueryGrid 
          type="Booking" 
          selectedColumns={['id','name','roomType','roomNumber','cost','bookingStartDate','bookingEndDate']}
          headerTitles={{ roomNumber:'Room', bookingStartDate:'Start', bookingEndDate:'End' }}
          visibleFrom={{ bookingStartDate:'lg', bookingEndDate:'xl' }}
        />
      </CodeExample>

      <CodeExample
        title="Custom Responsive Columns"
        description="Which columns are displayed and how they're formatted are further customizable with column and header slots:"
        code={`<AutoQueryGrid 
  type="Booking" 
  visibleFrom={{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl', createdBy:'2xl' }}
  columnSlots={{
    id: ({ id }) => <span className="text-gray-900">{id}</span>,
    name: ({ name }) => name,
    cost: ({ cost }) => <span dangerouslySetInnerHTML={{ __html: currency(cost) }} />,
    createdBy: ({ createdBy }) => createdBy
  }}
  headerSlots={{
    'roomNumber-header': () => <><span className="hidden lg:inline">Room </span>No</>,
    'bookingStartDate-header': () => <>Start<span className="hidden lg:inline"> Date</span></>,
    'bookingEndDate-header': () => <>End<span className="hidden lg:inline"> Date</span></>,
    'createdBy-header': () => <>Employee</>
  }}
/>`}
      >
        <ResponsiveExample />
      </CodeExample>

      <CodeExample
        title="Custom Functionality"
        description="The column template slots can be leveraged to implement custom functionality, e.g. instead of navigating to separate pages to manage related data we can use a custom column to manage Booking Coupons from within the same grid:"
        code={`<AutoQueryGrid 
  type="Booking" 
  selectedColumns={['id','name','cost','bookingStartDate','bookingEndDate','discount']}
  columnSlots={{
    discount: ({ discount }) => (
      discount ? (
        <TextLink 
          className="flex items-end" 
          onClick={(e) => {
            e.stopPropagation()
            showCoupon(discount.id)
          }} 
          title={discount.id}
        >
          <Icon className="w-5 h-5 mr-1" type="Coupon" />
          <PreviewFormat value={discount.description} />
        </TextLink>
      ) : null
    )
  }}
/>
{coupon && (
  <AutoEditForm 
    type="UpdateCoupon" 
    value={coupon} 
    onDone={close} 
    onSave={close} 
  />
)}`}
      >
        <CustomBookingExample />
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mt-12">
        <h2>Features that can be hidden and disabled</h2>
        <CodeBlock code={`interface AutoQueryGridProps {
  deny?: "filtering" | "queryString" | "queryFilters"
  hide?: "toolbar" | "preferences" | "pagingNav" | "pagingInfo"
       | "downloadCsv" | "refresh" | "copyApiUrl" | "filtersView"
       | "newItem" | "resetPreferences"
}`} language="typescript" />

        <h2>Global AutoQueryGrid Configuration</h2>
        <p>
          These features can also be disabled at a global level, applying to all AutoQueryGrid components with setConfig:
        </p>
        <CodeBlock code={`import { useConfig } from '@servicestack/react'

const { setAutoQueryGridDefaults } = useConfig()

setAutoQueryGridDefaults({
  hide: ['pagingNav','copyApiUrl','downloadCsv']
})`} language="typescript" />
      </div>
    </GalleryLayout>
  )
}

export default function AutoQueryGridPage() {
  return (
    <GalleryProvider>
      <AutoQueryGridContent />
    </GalleryProvider>
  )
}


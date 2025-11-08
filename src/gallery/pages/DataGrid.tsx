import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { DataGrid } from '@servicestack/react'
import { useFormatters } from '@servicestack/react'
import { tracks, forecasts, bookings } from '../data'
import type { Booking } from '../data'

export default function DataGridPage() {
  const { currency } = useFormatters()
  const [selected, setSelected] = useState<number | null>(null)

  const headerSelected = (column: string) => {
    console.log('headerSelected', column)
  }

  const rowSelected = (row: Booking) => {
    setSelected(selected === row.id ? null : row.id)
    console.log('rowSelected', row)
  }

  return (
    <GalleryLayout title="DataGrid Component">
      <CodeExample
        title="Default"
        description="In its most simple usage the DataGrid component can be used to render typed collections:"
        code={`<DataGrid items={tracks} />

const tracks = [
  { id: 1, name: "Everythings Ruined", artist: "Faith No More", album: "Angel Dust", year: 1992 },
  { id: 2, name: "Lightning Crashes", artist: "Live", album: "Throwing Copper", year: 1994 },
  { id: 3, name: "Heart-Shaped Box", artist: "Nirvana", album: "In Utero", year: 1993 },
  { id: 4, name: "Alive", artist: "Pearl Jam", album: "Ten", year: 1991 },
]`}
      >
        <DataGrid items={tracks} />
      </CodeExample>

      <CodeExample
        description="Use selected-columns to control which columns to display and header-titles to use different column names:"
        code={`<DataGrid 
  items={tracks} 
  selectedColumns={['year','album','name','artist']} 
  headerTitles={{ name:'Track' }} 
/>`}
      >
        <DataGrid 
          items={tracks} 
          selectedColumns={['year','album','name','artist']} 
          headerTitles={{ name:'Track' }} 
        />
      </CodeExample>

      <CodeExample
        title="Simple Customizations"
        description="Which columns are shown and how they're rendered is customizable with custom column and header slots:"
        code={`<DataGrid 
  items={forecasts} 
  className="max-w-screen-md" 
  tableStyle={['stripedRows','uppercaseHeadings']}
  headerTitles={{ temperatureC:'TEMP. (C)', temperatureF:'TEMP. (F)' }}
  headerSlots={{
    'date-header': () => <span className="text-indigo-600">Date</span>
  }}
  columnSlots={{
    date: ({ date }) => new Intl.DateTimeFormat().format(new Date(date)),
    temperatureC: ({ temperatureC }) => <>{temperatureC}&deg;</>,
    temperatureF: ({ temperatureF }) => <>{temperatureF}&deg;</>,
    summary: ({ summary }) => summary
  }}
/>`}
      >
        <DataGrid
          items={forecasts}
          className="max-w-screen-md"
          tableStyle={['stripedRows','uppercaseHeadings']}
          headerTitles={{ temperatureC:'TEMP. (C)', temperatureF:'TEMP. (F)' }}
          slots={{
            'date-header': () => <span className="text-indigo-600">Date</span>,
            date: ({ date }: any) => new Intl.DateTimeFormat().format(new Date(date)),
            temperatureC: ({ temperatureC }: any) => <>{temperatureC}&deg;</>,
            temperatureF: ({ temperatureF }: any) => <>{temperatureF}&deg;</>,
            summary: ({ summary }: any) => summary
          }}
        />
      </CodeExample>

      <CodeExample
        title="Responsive"
        description="A more advanced example showing how to implement a responsive datagrid defining what columns and Headers are visible at different screen sizes using visibleFrom to specify which columns to show from different Tailwind responsive breakpoints:"
        code={`<DataGrid 
  items={bookings}
  visibleFrom={{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl' }}
  onHeaderSelected={headerSelected}
  onRowSelected={rowSelected}
  isSelected={row => selected === row.id}
  columnSlots={{
    id: ({ id }) => <span className="text-gray-900">{id}</span>,
    name: ({ name }) => name,
    cost: ({ cost }) => <span dangerouslySetInnerHTML={{ __html: currency(cost) }} />,
    createdBy: ({ createdBy }) => <span dangerouslySetInnerHTML={{ __html: createdBy }} />
  }}
  headerSlots={{
    'roomNumber-header': () => <><span className="hidden lg:inline">Room </span>No</>,
    'bookingStartDate-header': () => <>Start<span className="hidden lg:inline"> Date</span></>,
    'bookingEndDate-header': () => <>End<span className="hidden lg:inline"> Date</span></>,
    'createdBy-header': () => <>Employee</>
  }}
/>`}
      >
        <DataGrid
          items={bookings}
          visibleFrom={{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl' }}
          onHeaderSelected={headerSelected}
          onRowSelected={rowSelected}
          isSelected={(row: any) => selected === row.id}
          slots={{
            id: ({ id }: any) => <span className="text-gray-900">{id}</span>,
            name: ({ name }: any) => name,
            cost: ({ cost }: any) => <span dangerouslySetInnerHTML={{ __html: currency(cost) }} />,
            createdBy: ({ createdBy }: any) => <span dangerouslySetInnerHTML={{ __html: createdBy }} />,
            'roomNumber-header': () => <><span className="hidden lg:inline">Room </span>No</>,
            'bookingStartDate-header': () => <>Start<span className="hidden lg:inline"> Date</span></>,
            'bookingEndDate-header': () => <>End<span className="hidden lg:inline"> Date</span></>,
            'createdBy-header': () => <>Employee</>
          }}
        />
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Using Formatters</h2>
        <p>
          Your App and custom templates can also utilize @servicestack/react's built-in formatting functions from:
        </p>
        <CodeBlock code="import { useFormatters } from '@servicestack/react'" language="typescript" />
      </div>
    </GalleryLayout>
  )
}


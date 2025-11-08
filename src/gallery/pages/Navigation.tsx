import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { 
  Tabs,
  Breadcrumbs,
  Breadcrumb,
  NavList,
  NavListItem,
  PrimaryButton,
  SecondaryButton,
  TextLink
} from '@servicestack/react'

// Example tab components
function TabA() {
  return <div className="p-4">Content for Tab A</div>
}

function TabB() {
  return <div className="p-4">Content for Tab B</div>
}

function TabC() {
  return <div className="p-4">Content for Tab C</div>
}

const tabs = {
  'A': TabA,
  'B': TabB,
  'C': TabC
}

// Icons for NavList (simplified SVG paths)
const Icons = {
  DataGrid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`,
  AutoQueryGrid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
}

export default function NavigationPage() {
  const say = (msg: string) => {
    alert(msg)
  }

  return (
    <GalleryLayout title="Navigation Components">
      <CodeExample
        title="Tabs"
        description="The Tabs component lets you switch between different React components from an object component dictionary where the Key is used for the Tab's label and URL param and the Value component for the tab body:"
        code={`const tabs = {
  'A': TabA,
  'B': TabB,
  'C': TabC
}

<Tabs tabs={tabs} label={(tab) => \`\${tab} Tab Label\`} />`}
      >
        <Tabs tabs={tabs} label={(tab) => `${tab} Tab Label`} />
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none my-8">
        <h3>Tabs Properties</h3>
        <CodeBlock code={`interface TabsProps {
  tabs: { [name: string]: React.ComponentType }
  id?: string                      //= tabs
  param?: string                   //= tab - URL param to use
  label?: (tab: string) => string  // - Custom function to resolve Tab Label
  selected?: string                // - The selected tab
  tabClass?: string                // - Additional classes for Tab Label
  bodyClass?: string               // - Classes for Tab Body
  url?: boolean                    //= true - Whether to maintain active tab in history.pushState()
}`} language="typescript" />
      </div>

      <CodeExample
        title="Breadcrumbs"
        description="Breadcrumb navigation component:"
        code={`<Breadcrumbs homeHref="/gallery">
  <Breadcrumb href="/gallery">gallery</Breadcrumb>
  <Breadcrumb>Navigation Examples</Breadcrumb>
</Breadcrumbs>`}
      >
        <Breadcrumbs homeHref="/gallery">
          <Breadcrumb href="/gallery">gallery</Breadcrumb>
          <Breadcrumb>Navigation Examples</Breadcrumb>
        </Breadcrumbs>
      </CodeExample>

      <CodeExample
        title="NavList"
        description="Use NavList for rendering a vertical navigation list with Icons:"
        code={`<NavList title="Explore React Tailwind Components">
  <NavListItem 
    title="DataGrid" 
    href="/gallery/datagrid" 
    iconSvg={Icons.DataGrid}
  >
    DataGrid Component Examples for rendering tabular data
  </NavListItem>
  <NavListItem 
    title="AutoQuery Grid" 
    href="/gallery/autoquerygrid" 
    iconSvg={Icons.AutoQueryGrid}
  >
    Instant customizable UIs for calling AutoQuery CRUD APIs
  </NavListItem>
</NavList>`}
      >
        <div className="max-w-3xl mx-auto">
          <NavList title="Explore React Tailwind Components">
            <NavListItem 
              title="DataGrid" 
              href="/gallery/datagrid" 
              iconSvg={Icons.DataGrid}
            >
              DataGrid Component Examples for rendering tabular data
            </NavListItem>
            <NavListItem 
              title="AutoQuery Grid" 
              href="/gallery/autoquerygrid" 
              iconSvg={Icons.AutoQueryGrid}
            >
              Instant customizable UIs for calling AutoQuery CRUD APIs
            </NavListItem>
          </NavList>
        </div>
      </CodeExample>

      <CodeExample
        title="Link Buttons"
        description="Using href with Button components will style hyper links to behave like buttons:"
        code={`<PrimaryButton href="https://react-gallery.servicestack.net/" className="mr-2">
  React Gallery Template
</PrimaryButton>

<SecondaryButton href="/gallery">
  React Component Docs
</SecondaryButton>`}
      >
        <div className="space-x-2">
          <PrimaryButton href="https://react-gallery.servicestack.net/" className="mr-2">
            React Gallery Template
          </PrimaryButton>
          <SecondaryButton href="/gallery">
            React Component Docs
          </SecondaryButton>
        </div>
      </CodeExample>

      <CodeExample
        title="PrimaryButton Colors"
        description="PrimaryButton can use color to render it in different colors:"
        code={`<PrimaryButton>Default</PrimaryButton>
<PrimaryButton color="blue">Blue</PrimaryButton>
<PrimaryButton color="purple">Purple</PrimaryButton>
<PrimaryButton color="red">Red</PrimaryButton>
<PrimaryButton color="green">Green</PrimaryButton>
<PrimaryButton color="sky">Sky</PrimaryButton>
<PrimaryButton color="cyan">Cyan</PrimaryButton>
<PrimaryButton color="indigo">Indigo</PrimaryButton>`}
      >
        <div className="space-x-2">
          <PrimaryButton>Default</PrimaryButton>
          <PrimaryButton color="blue">Blue</PrimaryButton>
          <PrimaryButton color="purple">Purple</PrimaryButton>
          <PrimaryButton color="red">Red</PrimaryButton>
          <PrimaryButton color="green">Green</PrimaryButton>
          <PrimaryButton color="sky">Sky</PrimaryButton>
          <PrimaryButton color="cyan">Cyan</PrimaryButton>
          <PrimaryButton color="indigo">Indigo</PrimaryButton>
        </div>
      </CodeExample>

      <CodeExample
        title="TextLink"
        description="Tailwind styled hyperlinks:"
        code={`<TextLink href="/gallery" className="text-xl">
  docs.servicestack.net/react
</TextLink>`}
      >
        <TextLink href="/gallery" className="text-xl">
          docs.servicestack.net/react
        </TextLink>
      </CodeExample>

      <CodeExample
        title="TextLink Colors"
        description="TextLink can also use color to render it in different colors:"
        code={`<TextLink onClick={() => say('Hi!')} title="Greetings">
  Default <b>Link</b>
</TextLink>
<TextLink color="purple" href="https://google.com" target="_blank" title="Google Link">
  Purple <b>Link</b>
</TextLink>
<TextLink color="red" href="https://google.com" target="_blank" title="Google Link">
  Red <b>Link</b>
</TextLink>
<TextLink color="green" href="https://google.com" target="_blank" title="Google Link">
  Green <b>Link</b>
</TextLink>
<TextLink color="sky" href="https://google.com" target="_blank" title="Google Link">
  Sky <b>Link</b>
</TextLink>
<TextLink color="cyan" href="https://google.com" target="_blank" title="Google Link">
  Cyan <b>Link</b>
</TextLink>
<TextLink color="indigo" href="https://google.com" target="_blank" title="Google Link">
  Indigo <b>Link</b>
</TextLink>`}
      >
        <div className="flex flex-wrap gap-4">
          <TextLink onClick={() => say('Hi!')} title="Greetings">
            Default <b>Link</b>
          </TextLink>
          <TextLink color="purple" href="https://google.com" target="_blank" title="Google Link">
            Purple <b>Link</b>
          </TextLink>
          <TextLink color="red" href="https://google.com" target="_blank" title="Google Link">
            Red <b>Link</b>
          </TextLink>
          <TextLink color="green" href="https://google.com" target="_blank" title="Google Link">
            Green <b>Link</b>
          </TextLink>
          <TextLink color="sky" href="https://google.com" target="_blank" title="Google Link">
            Sky <b>Link</b>
          </TextLink>
          <TextLink color="cyan" href="https://google.com" target="_blank" title="Google Link">
            Cyan <b>Link</b>
          </TextLink>
          <TextLink color="indigo" href="https://google.com" target="_blank" title="Google Link">
            Indigo <b>Link</b>
          </TextLink>
        </div>
      </CodeExample>
    </GalleryLayout>
  )
}


import { useState } from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeExample from '../components/CodeExample'
import CodeBlock from '../components/CodeBlock'
import { Combobox, AutoForm } from '@servicestack/react'
import { GalleryProvider } from '../context'

function ComboboxContent() {
  const [strings, setStrings] = useState('')
  const [objects, setObjects] = useState('')
  const [pairs, setPairs] = useState<string[]>([])

  return (
    <GalleryLayout title="Combobox Component">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>
          The <code>Combobox</code> component provides an Autocomplete Input optimized for searching a List of string values, Key Value Pairs or Object Dictionary.
        </p>
      </div>


      <CodeExample
        title="Combobox Examples"
        description="Combobox supports different data sources including string arrays, objects, and key-value pairs:"
        code={`<div className="grid grid-cols-12 gap-6">
  <Combobox
    id="Strings"
    className="col-span-12 xl:col-span-3"
    label="Strings"
    value={strings}
    onChange={setStrings}
    values={['Alpha','Bravo','Charlie']}
  />
  <Combobox
    id="Object"
    className="col-span-12 xl:col-span-3"
    label="Object"
    value={objects}
    onChange={setObjects}
    options={{ A:'Alpha', B:'Bravo', C:'Charlie' }}
  />
  <Combobox
    id="Pairs"
    className="col-span-12 xl:col-span-6"
    value={pairs}
    onChange={setPairs}
    label="Multiple from Pairs"
    multiple
    entries={[
      {key:'A',value:'Alpha'},
      {key:'B',value:'Bravo'},
      {key:'C',value:'Charlie'}
    ]}
  />
</div>`}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-3">
            <Combobox
              id="Strings"
              label="Strings"
              value={strings}
              onChange={setStrings}
              values={['Alpha','Bravo','Charlie']}
            />
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              <strong>Selected:</strong> {JSON.stringify(strings)}
            </div>
          </div>

          <div className="col-span-12 xl:col-span-3">
            <Combobox
              id="Object"
              label="Object"
              value={objects}
              onChange={setObjects}
              options={{ A:'Alpha', B:'Bravo', C:'Charlie' }}
            />
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              <strong>Selected:</strong> {JSON.stringify(objects)}
            </div>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <Combobox
              id="Pairs"
              value={pairs}
              onChange={setPairs}
              label="Multiple from Pairs"
              multiple
              entries={[
                {key:'A',value:'Alpha'},
                {key:'B',value:'Bravo'},
                {key:'C',value:'Charlie'}
              ]}
            />
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              <strong>Selected:</strong> {JSON.stringify(pairs)}
            </div>
          </div>
        </div>
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none my-8">
        <p>
          Which supports populating both a single string value or multiple strings in an Array with <strong>multiple</strong> property.
        </p>
      </div>

      <CodeExample
        title="Auto Forms"
        description="Combobox components can also be used in Auto Form Components on string or string collection properties with the [Input(Type='combobox')] declarative UI Attribute on C# Request DTOs:"
        code={`<AutoForm type="ComboBoxExamples" />`}
      >
        <AutoForm type="ComboBoxExamples" />
      </CodeExample>

      <div className="prose dark:prose-invert max-w-none mt-12">
        <h2>C# Request DTO Example</h2>
        <CodeBlock code={`public class ComboBoxExamples : IReturn<ComboBoxExamples>, IPost
{
    [Input(Type="combobox", Options = "{ allowableValues:['Alpha','Bravo','Charlie'] }")]
    public string? SingleClientValues { get; set; }

    [Input(Type="combobox", Options = "{ allowableValues:['Alpha','Bravo','Charlie'] }", Multiple = true)]
    public List<string>? MultipleClientValues { get; set; }

    [Input(Type="combobox", EvalAllowableValues = "['Alpha','Bravo','Charlie']")]
    public string? SingleServerValues { get; set; }

    [Input(Type="combobox", EvalAllowableValues = "AppData.AlphaValues", Multiple = true)]
    public List<string>? MultipleServerValues { get; set; }

    [Input(Type="combobox", EvalAllowableEntries = "{ A:'Alpha', B:'Bravo', C:'Charlie' }")]
    public string? SingleServerEntries { get; set; }

    [Input(Type="combobox", EvalAllowableEntries = "AppData.AlphaDictionary", Multiple = true)]
    public List<string>? MultipleServerEntries { get; set; }
}`} language="csharp" />

        <h2>Combobox Options</h2>
        <p>
          Each property shows a different way of populating the Combobox's optional values, they can be populated from a JavaScript
          Object literal using <code>Options</code> or on the server with a #Script Expression where they can be 
          populated from a static list or from a C# class as seen in the examples referencing <code>AppData</code> properties:
        </p>
        <CodeBlock code={`public class AppData
{
    public List<string> AlphaValues { get; set; }
    public Dictionary<string, string> AlphaDictionary { get; set; }
    public List<KeyValuePair<string, string>> AlphaKeyValuePairs { get; set; }
}`} language="csharp" />

        <p>Which are populated in the AppHost on Startup with:</p>
        <CodeBlock code={`ScriptContext.Args[nameof(AppData)] = new AppData
{
    AlphaValues = new() {
        "Alpha", "Bravo", "Charlie"
    },
    AlphaDictionary = new()
    {
        ["A"] = "Alpha",
        ["B"] = "Bravo",
        ["C"] = "Charlie",
    },
    AlphaKeyValuePairs = new()
    {
        new("A","Alpha"),
        new("B","Bravo"),
        new("C","Charlie"),
    },
};`} language="csharp" />

        <p>
          Which can alternatively be populated from a dynamic source like an RDBMS table.
        </p>
        <p>
          As C# Dictionaries have an undetermined sort order, you can use a <code>List&lt;KeyValuePair&lt;string, string&gt;&gt;</code> instead when you need to
          display an ordered list of Key/Value pairs.
        </p>
      </div>
    </GalleryLayout>
  )
}

export default function ComboboxPage() {
  return (
    <GalleryProvider>
      <ComboboxContent />
    </GalleryProvider>
  )
}


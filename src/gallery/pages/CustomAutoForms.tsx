import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function CustomAutoFormsPage() {
  return (
    <GalleryLayout title="Custom Auto Forms">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          In addition to the standard AutoForm components, you can create custom implementations to handle complex scenarios
          like Many-to-Many relationships or specialized business logic.
        </p>

        <h2>Custom AutoQuery Implementation</h2>
        <p>
          When you need to handle complex updates beyond simple CRUD operations, you can create custom AutoQuery implementations
          on the server side while still benefiting from AutoForm's declarative approach on the client.
        </p>

        <h3>Example: Many-to-Many Relationships</h3>
        <p>
          Here's an example of handling a Many-to-Many relationship between Categories and Options:
        </p>

        <h4>Server-Side DTO</h4>
        <CodeBlock code={`public class UpdateCategory : IPatchDb<Category>, IReturn<Category>
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }

    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string>? Sizes { get; set; }

    [Input(Type = "file"), UploadTo("products")]
    public string? ImageUrl { get; set; }

    // Hidden inputs for managing Many-to-Many relationship
    [Input(Type = "hidden")]
    public List<int>? AddOptionIds { get; set; }

    [Input(Type = "hidden")]
    public List<int>? RemoveOptionIds { get; set; }
}`} language="csharp" />

        <h4>Custom Service Implementation</h4>
        <CodeBlock code={`public class CategoryServices : Service
{
    public IAutoQueryDb AutoQuery { get; set; }

    public async Task<object> Any(UpdateCategory request)
    {
        // Perform all RDBMS Updates within the same Transaction
        using var trans = Db.OpenTransaction();

        Category? response = null;
        var ignore = new[] {
            nameof(request.Id),
            nameof(request.AddOptionIds),
            nameof(request.RemoveOptionIds)
        };

        // Only call AutoQuery Update if there's something to update
        if (request.ToObjectDictionary().HasNonDefaultValues(ignoreKeys: ignore))
        {
            response = (Category) await AutoQuery.PartialUpdateAsync<Category>(
                request, Request, Db);
        }

        // Handle Many-to-Many removals
        if (request.RemoveOptionIds?.Count > 0)
        {
            await Db.DeleteAsync<CategoryOption>(x =>
                x.CategoryId == request.Id &&
                request.RemoveOptionIds.Contains(x.OptionId));
        }

        // Handle Many-to-Many additions
        if (request.AddOptionIds?.Count > 0)
        {
            await Db.InsertAllAsync(request.AddOptionIds.Map(id =>
                new CategoryOption {
                    CategoryId = request.Id,
                    OptionId = id
                }));
        }

        trans.Commit();
        response ??= request.ConvertTo<Category>();
        return response;
    }
}`} language="csharp" />

        <h2>Custom Form Components</h2>
        <p>
          You can create custom React components to handle complex UI requirements while still integrating with AutoForm:
        </p>

        <h3>Example: Category Options Selector</h3>
        <CodeBlock code={`import { useState, useEffect } from 'react'
import { useClient } from '@servicestack/react'

function CategoryOptions({ modelValue, onChange }) {
  const client = useClient()
  const [options, setOptions] = useState([])
  const [addOptionIds, setAddOptionIds] = useState([])
  const [removeOptionIds, setRemoveOptionIds] = useState([])

  useEffect(() => {
    // Load available options
    client.api(new QueryOptions({ orderBy: 'id' }))
      .then(api => {
        if (api.succeeded) {
          setOptions(api.response.results || [])
        }
      })
  }, [])

  const handleAddOption = (optionId) => {
    if (removeOptionIds.includes(optionId)) {
      setRemoveOptionIds(removeOptionIds.filter(id => id !== optionId))
    } else if (!addOptionIds.includes(optionId)) {
      setAddOptionIds([...addOptionIds, optionId])
    }

    onChange({
      ...modelValue,
      addOptionIds: [...addOptionIds, optionId],
      removeOptionIds: removeOptionIds.filter(id => id !== optionId)
    })
  }

  const handleRemoveOption = (optionId) => {
    if (addOptionIds.includes(optionId)) {
      setAddOptionIds(addOptionIds.filter(id => id !== optionId))
    } else if (!removeOptionIds.includes(optionId)) {
      setRemoveOptionIds([...removeOptionIds, optionId])
    }

    onChange({
      ...modelValue,
      addOptionIds: addOptionIds.filter(id => id !== optionId),
      removeOptionIds: [...removeOptionIds, optionId]
    })
  }

  return (
    <div className="space-y-2">
      {/* Render current options with remove buttons */}
      {/* Render available options with add buttons */}
    </div>
  )
}`} language="tsx" />

        <h2>Extending AutoForm with Custom Slots</h2>
        <p>
          AutoForm components support custom slots to inject your own UI:
        </p>
        <CodeBlock code={`<AutoEditForm
  type="UpdateCategory"
  onSave={handleSave}
  formFooter={(props) => (
    <div className="mt-4 px-4">
      <h3 className="text-lg font-semibold">Options</h3>
      <CategoryOptions
        modelValue={props.model}
        onChange={props.updateModel}
      />
    </div>
  )}
/>`} language="tsx" />

        <h2>Benefits</h2>
        <ul>
          <li><strong>Declarative DTOs</strong> - Continue using ServiceStack's declarative approach</li>
          <li><strong>Type Safety</strong> - Full TypeScript support for custom implementations</li>
          <li><strong>Validation</strong> - Automatic validation binding from server responses</li>
          <li><strong>Flexibility</strong> - Mix standard and custom components as needed</li>
          <li><strong>Transactions</strong> - Handle complex multi-table updates atomically</li>
        </ul>

        <h2>See Also</h2>
        <ul>
          <li><a href="/gallery/autoform" className="text-blue-600 dark:text-blue-400 hover:underline">Auto Forms</a> - Standard AutoForm components</li>
          <li><a href="/gallery/custom-inputs" className="text-blue-600 dark:text-blue-400 hover:underline">Custom Inputs</a> - Creating custom input components</li>
          <li><a href="/gallery/autoquerygrid" className="text-blue-600 dark:text-blue-400 hover:underline">AutoQueryGrid</a> - Data grid with CRUD operations</li>
        </ul>
      </div>
    </GalleryLayout>
  )
}


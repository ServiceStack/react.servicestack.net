import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function UseFilesPage() {
  return (
    <GalleryLayout title="useFiles Hook">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          The file utils are utilized by the <code>&lt;FileInput&gt;</code> Input component and
          <code>icon</code>, <code>iconRounded</code> and <code>attachment</code> formatters for resolving file SVG Icons
          and MIME Types that Apps can also utilize in <code>useFiles()</code>.
        </p>

        <h2>Available Functions</h2>
        <CodeBlock code={`import { useFiles } from '@servicestack/react'

const {
  extSvg,           // Resolve SVG XML for file extension
  extSrc,           // Resolve SVG Data URI for file extension
  getExt,           // Resolve File extension from file name or path
  canPreview,       // Check if path or URI is of a supported web image type
  getFileName,      // Resolve file name from /file/path
  getMimeType,      // Resolve the MIME type for a file path name or extension
  formatBytes,      // Format file size in human readable bytes
  filePathUri,      // Resolve the Icon URI to use for file
  encodeSvg,        // Encode SVG XML for usage in Data URIs
  svgToDataUri,     // Convert SVG XML to data:image URL
  fileImageUri,     // Resolve image preview URL for file
  objectUrl,        // Create and track an Object URL for an uploaded file
  flush,            // Release all tracked Object URLs
  inputFiles,       // Resolve file metadata for all uploaded HTML input files
  iconOnError,      // Error handler for broken images to return a fallbackSrc
  iconFallbackSrc,  // Resolve the fallback URL for a broken Image URL
} = useFiles()`} language="typescript" />

        <h2>Usage Examples</h2>

        <h3>File Extension and MIME Type</h3>
        <CodeBlock code={`import { useFiles } from '@servicestack/react'

function FileInfo({ filePath }) {
  const { getExt, getMimeType, getFileName } = useFiles()
  
  const ext = getExt(filePath)        // "pdf"
  const mime = getMimeType(filePath)  // "application/pdf"
  const name = getFileName(filePath)  // "document.pdf"
  
  return (
    <div>
      <p>File: {name}</p>
      <p>Type: {ext} ({mime})</p>
    </div>
  )
}`} language="tsx" />

        <h3>File Size Formatting</h3>
        <CodeBlock code={`const { formatBytes } = useFiles()

formatBytes(1024)       // "1 KB"
formatBytes(1048576)    // "1 MB"
formatBytes(1073741824) // "1 GB"
formatBytes(1536, 2)    // "1.50 KB" (with 2 decimal places)`} language="typescript" />

        <h3>File Icons</h3>
        <CodeBlock code={`const { extSvg, extSrc, filePathUri } = useFiles()

// Get SVG XML for extension
const svgXml = extSvg('pdf')

// Get SVG Data URI for extension
const svgDataUri = extSrc('pdf')

// Get icon URI for file path
const iconUri = filePathUri('/documents/report.pdf')

// Use in component
function FileIcon({ filePath }) {
  const { filePathUri } = useFiles()
  return <img src={filePathUri(filePath)} alt="File icon" />
}`} language="tsx" />

        <h3>Image Preview</h3>
        <CodeBlock code={`const { canPreview, fileImageUri } = useFiles()

function FilePreview({ file }) {
  const { canPreview, fileImageUri } = useFiles()
  
  if (canPreview(file.name)) {
    return <img src={fileImageUri(file)} alt={file.name} />
  }
  
  return <span>Cannot preview {file.name}</span>
}

// canPreview checks for: .jpg, .jpeg, .png, .gif, .svg, .webp`} language="tsx" />

        <h3>Object URLs for Uploaded Files</h3>
        <CodeBlock code={`const { objectUrl, flush } = useFiles()

function FileUpload() {
  const { objectUrl, flush } = useFiles()
  const [preview, setPreview] = useState('')
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create and track object URL
      const url = objectUrl(file)
      setPreview(url)
    }
  }
  
  useEffect(() => {
    // Clean up object URLs when component unmounts
    return () => flush()
  }, [])
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  )
}`} language="tsx" />

        <h3>Input File Metadata</h3>
        <CodeBlock code={`const { inputFiles } = useFiles()

function FileList() {
  const { inputFiles } = useFiles()
  const [files, setFiles] = useState([])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    const fileMetadata = inputFiles(input)
    setFiles(fileMetadata || [])
  }
  
  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.fileName} - {file.contentLength} bytes
          </li>
        ))}
      </ul>
    </div>
  )
}

// Returns: [{ fileName, contentLength, filePath }]`} language="tsx" />

        <h3>SVG Encoding</h3>
        <CodeBlock code={`const { encodeSvg, svgToDataUri } = useFiles()

const svgXml = '<svg>...</svg>'

// Encode for use in URLs
const encoded = encodeSvg(svgXml)

// Convert to data URI
const dataUri = svgToDataUri(svgXml)
// "data:image/svg+xml,%3Csvg%3E...%3C/svg%3E"`} language="tsx" />

        <h3>Image Error Handling</h3>
        <CodeBlock code={`const { iconOnError, iconFallbackSrc } = useFiles()

function SafeImage({ src, fallback }) {
  const { iconOnError } = useFiles()
  
  return (
    <img 
      src={src} 
      onError={(e) => iconOnError(e.currentTarget, fallback)}
      alt="Image"
    />
  )
}

// Or get fallback URL directly
const fallbackUrl = iconFallbackSrc('/broken/image.jpg', '/default.jpg')`} language="tsx" />

        <h2>Supported File Extensions</h2>
        <p>
          The <code>useFiles</code> hook includes built-in SVG icons for common file types:
        </p>
        <ul>
          <li><strong>Documents:</strong> pdf, doc, docx, xls, xlsx, ppt, pptx</li>
          <li><strong>Images:</strong> jpg, jpeg, png, gif, svg, webp, bmp, ico</li>
          <li><strong>Archives:</strong> zip, rar, 7z, tar, gz</li>
          <li><strong>Code:</strong> js, ts, jsx, tsx, html, css, json, xml</li>
          <li><strong>Media:</strong> mp3, mp4, avi, mov, wmv, flv</li>
          <li><strong>Text:</strong> txt, md, csv</li>
        </ul>

        <h2>TypeScript Definition</h2>
        <CodeBlock code={`/** Resolve SVG XML for file extension */
function extSvg(ext: string): string | null;

/** Resolve SVG URI for file extension */
function extSrc(ext: string): any;

/** Resolve File extension from file name or path */
function getExt(path?: string | null): string | null;

/** Check if path or URI is of a supported web image type */
function canPreview(path: string): boolean;

/** Resolve file name from /file/path */
function getFileName(path?: string | null): string | null;

/** Resolve the MIME type for a file path name or extension */
function getMimeType(fileNameOrExt: string): string;

/** Format file size in human readable bytes */
function formatBytes(bytes: number, d?: number): string;

/** Resolve the Icon URI to use for file */
function filePathUri(path?: string): string | null;

/** Create and track Image URL for an uploaded file */
function objectUrl(file: Blob | MediaSource): string;

/** Release all tracked Object URLs */
function flush(): void;

/** Resolve file metadata for all uploaded HTML file input files */
function inputFiles(input: HTMLInputElement): {
  fileName: string;
  contentLength: number;
  filePath: string | null;
}[] | null;`} language="typescript" />
      </div>
    </GalleryLayout>
  )
}


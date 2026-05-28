// Loader for real Grok documentation from @content/*.md
// Uses Vite's import.meta.glob with raw imports

// Glob all markdown files (eager so we have the content at build time)
const mdModules = import.meta.glob('@content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Helper: turn "01-getting-started.md" into slug "getting-started"
function filenameToSlug(filename) {
  return filename
    .replace(/^\d+-/, '')     // remove leading number prefix
    .replace(/\.md$/, '')     // remove extension
    .toLowerCase()
}

// Extract the first H1 title from the markdown content
function extractTitle(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  return fallback
}

// Extract a short description (first paragraph after the title)
function extractDescription(markdown) {
  // Remove the first heading
  const withoutTitle = markdown.replace(/^#\s+.+\n+/, '')
  // Get the first non-empty paragraph
  const paraMatch = withoutTitle.match(/([^\n]+(?:\n(?!#|```|\||>|\*|-|\d+\.|\s*$)[^\n]+)*)/)
  if (paraMatch) {
    let desc = paraMatch[0].trim()
    // Clean up a bit
    desc = desc.replace(/\s+/g, ' ')
    if (desc.length > 160) desc = desc.slice(0, 157) + '...'
    return desc
  }
  return ''
}

// Build the full docs list, sorted by the numeric prefix in the filename
const allDocsRaw = Object.entries(mdModules)
  .map(([path, content]) => {
    const filename = path.split('/').pop()
    const match = filename.match(/^(\d+)-(.+)\.md$/)
    const order = match ? parseInt(match[1], 10) : 999
    const slug = filenameToSlug(filename)

    const title = extractTitle(content, slug.replace(/-/g, ' '))

    return {
      slug,
      title,
      description: extractDescription(content),
      content,           // raw markdown string
      order,
      filename,
    }
  })
  .sort((a, b) => a.order - b.order)

export const docs = allDocsRaw

export function getAllDocs() {
  return docs
}

export function getDocBySlug(slug) {
  return docs.find((d) => d.slug === slug)
}

export function getDocIndex() {
  return docs.map(({ slug, title, description, order }) => ({
    slug,
    title,
    description,
    order,
  }))
}

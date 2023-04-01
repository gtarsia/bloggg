import { EOL } from 'node:os'
import { marked } from 'marked'
import { frontmatter } from '@/src/lib/frontmatter'

export function postRender({ contents }: {
  contents: string,
}) {
  const { attributes, lines } = frontmatter(contents)
  const rendered = marked(lines.join(EOL))
  const { title } = attributes
  const body = `\
  <div>
    <a href="/blog">Back to posts</a>
  </div>
  <h1>${title}</h1>${rendered}`
  const tags = (attributes.tags ?? '').split(' ')
  return { title, body, tags }
}

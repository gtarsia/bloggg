import { EOL } from 'node:os'
import { marked } from 'marked'
import { frontmatter } from '@/src/lib/frontmatter'

export function postRender({ contents, indent }: {
  contents: string,
  indent: number,
}) {
  const { attributes, lines } = frontmatter(contents)
  const rendered = marked(lines.join(EOL))
  const outLines = rendered.split(/\r?\n/)
  const outLinesIndented = outLines.map(line => `${' '.repeat(indent)}${line}`)
  const { title } = attributes
  const body = `\
  <div>
    <a href="/blog">Back to posts</a>
  </div>
  <h1>${title}</h1>` + outLinesIndented.join(EOL)
  const tags = (attributes.tags ?? '').split(' ')
  return { title, body, tags }
}

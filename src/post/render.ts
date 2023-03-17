import { EOL } from 'node:os'
import { marked } from 'marked'
import { frontmatter } from '@/src/lib/frontmatter'

export function postRender({ contents, indent }: {
  contents: string,
  indent: number,
}) {
  const { attributes: { title }, lines } = frontmatter(contents)
  const rendered = marked(lines.join(EOL))
  const outLines = rendered.split(/\r?\n/)
  const outLinesIndented = outLines.map(line => `${' '.repeat(indent)}${line}`)
  const body = outLinesIndented.join(EOL)
  return { title, body }
}

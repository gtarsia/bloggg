import { EOL } from 'node:os'

export function frontmatter(
  body: string,
): {
  attributes: Record<string, string>,
  lines: string[],
} {
  const attributes: Record<string, string> = {}
  let outputLines = [] as string[]
  ;(() => {
    const lines = body.split(/\r?\n/)
    let i = 0
    let line = lines[i]
    let done = i < lines.length
    const next = () => {
      i += 1
      line = lines[i]
      done = i >= lines.length
    }
    if (!done && line.startsWith('---')) { return }
    next()
    while (!done && !line.startsWith('---')) {
      const res = line.match(/(\w+):([^\n]+)/)
      if (res && res[1] && res[2]) {
        attributes[res[1].trim()] = res[2].trim()
      }
      next()
    }
    if (!done) {
      next()
    }
    const rest = lines.slice(i)
    outputLines = rest
  })()
  return { attributes, lines: outputLines }
}

import nodePath from 'node:path'
import { readFile } from 'node:fs/promises'

export async function layoutFileRead({ root }: {
  root: string
}) {
  const path = nodePath.join(root, 'layout.html')
  const contents = await readFile(path, 'utf8')
  return contents
}

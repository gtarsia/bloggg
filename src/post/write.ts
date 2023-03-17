import nodePath from 'node:path'
import { writeFile } from 'node:fs/promises'

export async function postWrite({ root, name, doc }: {
  root: string,
  name: string,
  doc: string,
}) {
  const path = nodePath.join(root, 'docs', 'posts', `${name}.html`)
  await writeFile(path, doc, 'utf8')
}

import nodePath from 'node:path'
import { readdir, readFile } from 'node:fs/promises'

export async function postFilesRead({ root }: {
  root: string
}) {
  const dir = nodePath.join(root, 'posts')
  const files = await readdir(dir, { withFileTypes: true })
  const nonDirs = files.filter(file => !file.isDirectory())
  const promises = nonDirs.map(async ({ name: mdName }) => {
    const path = nodePath.join(dir, mdName)
    const contents = await readFile(path, 'utf8')
    const { name } = nodePath.parse(mdName)
    return { name, contents }
  })
  const awaited = await Promise.all(promises)
  return awaited
}

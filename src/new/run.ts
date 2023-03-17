import { writeFile } from 'node:fs/promises'
import nodePath from 'node:path'
import { rootGet } from '@/src/root/get'
import { newPostFilenameBuild } from './postFilenameBuild'
import { newPostTemplateBuild } from './postTemplateBuild'
import { newPostWrite } from './postWrite'

export async function newRun({ title }: {
  title: string,
}) {
  // Get root
  const root = await rootGet()

  // Generate template
  const template = newPostTemplateBuild(title)

  // Generate filename
  const filename = newPostFilenameBuild(title)

  // Generate path
  const path = nodePath.join(root, 'posts', filename)

  // Write file
  await writeFile(path, template, 'utf8')
}

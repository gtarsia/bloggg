import { mkdir } from 'node:fs/promises'
import nodePath from 'node:path'

export async function blogPostsDirMkdir(root: string) {
  const postsDir = nodePath.join(root, 'docs', 'posts')
  await mkdir(postsDir, { recursive: true })
}

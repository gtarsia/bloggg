import nodePath from 'node:path'
import chokidar from 'chokidar'
import { buildRun } from '@/src/build/run'

export function postFilesWatch({ root, reload }: {
  root: string,
  reload: () => void,
}) {
  const path = nodePath.join(root, 'posts')
  chokidar.watch(path, {
    depth: 1,
    ignoreInitial: true,
  }).on('all', async () => {
    await buildRun(false)
    reload()
  })
}

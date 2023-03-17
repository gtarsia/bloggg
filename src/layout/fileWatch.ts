import nodePath from 'node:path'
import chokidar from 'chokidar'
import { buildRun } from '@/src/build/run'

export function layoutFileWatch({ root, reload }: {
  root: string,
  reload: () => void,
}) {
  const path = nodePath.join(root, 'layout.html')
  chokidar.watch(path, {
    ignoreInitial: true,
  }).on('all', async () => {
    await buildRun()
    reload()
  })
}
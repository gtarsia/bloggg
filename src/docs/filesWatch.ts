import nodePath from 'node:path'
import chokidar from 'chokidar'

export function docsFilesWatch({ root, reload }: {
  root: string,
  reload: () => void,
}) {
  const path = nodePath.join(root, 'docs')
  chokidar.watch(path, {
    depth: 1,
    ignoreInitial: true,
  }).on('all', async () => {
    reload()
  })
}

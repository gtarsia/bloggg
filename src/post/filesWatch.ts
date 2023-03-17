import nodePath from 'node:path'
import chokidar from 'chokidar'

export function postFilesWatch({ root }: {
  root: string,
}) {
  const path = nodePath.join(root, 'posts')
  chokidar.watch(path, {
    depth: 1,
    ignoreInitial: true,
  }).on('all', () => {
  })
}

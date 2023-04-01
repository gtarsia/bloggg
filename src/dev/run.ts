import { buildRun } from '@/src/build/run'
import { rootGet } from '@/src/root/get'
import { layoutFileWatch } from '@/src/layout/fileWatch'
import { postFilesWatch } from '@/src/post/filesWatch'
import { devServerRun } from '@/src/dev/serverRun'
import { docsFilesWatch } from '@/src/docs/filesWatch'

export async function devRun() {
  await buildRun(false)

  // Get the root of the project
  const root = await rootGet()

  const { reload } = devServerRun({ root })

  // Watch file layout.html
  layoutFileWatch({ root })

  // // Watch the files in ./posts/
  postFilesWatch({ root })

  reload()

  docsFilesWatch({ root, reload })
}

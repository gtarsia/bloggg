import { buildRun } from '@/src/build/run'
import { rootGet } from '@/src/root/get'
import { layoutFileWatch } from '@/src/layout/fileWatch'
import { postFilesWatch } from '@/src/post/filesWatch'
import { devServerRun } from '@/src/dev/serverRun'

export async function devRun() {
  await buildRun()

  // Get the root of the project
  const root = await rootGet()

  const { reload } = devServerRun({ root })

  // Watch file layout.html
  layoutFileWatch({ root, reload })

  // // Watch the files in ./posts/
  // postFilesWatch({ root })
}

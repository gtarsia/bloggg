import { rootGet } from '@/src/root/get'
import { layoutBuild } from '@/src/layout/build'
import { postFilesBuild } from '@/src/post/filesBuild'
import { indexBuild } from '@/src/index/build'

export async function buildRun() {
  const root = await rootGet()

  const layout = await layoutBuild({ root })

  const posts = await postFilesBuild({ layout, root })

  await indexBuild({ layout, root, posts })
  // Write docs/index.html file
}

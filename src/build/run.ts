import { rootGet } from '@/src/root/get'
// import { styleBuild } from '@/src/style/build'
import { layoutBuild } from '@/src/layout/build'
import { postFilesBuild } from '@/src/post/filesBuild'
import { indexBuild } from '@/src/index/build'

export async function buildRun(style = true) {
  const root = await rootGet()

  // if (style) {
  //   await styleBuild({ root })
  // }

  const layout = await layoutBuild({ root })

  const posts = await postFilesBuild({ layout, root })

  await indexBuild({ layout, root, posts })
  // Write docs/index.html file
}

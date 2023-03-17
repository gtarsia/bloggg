import { tmplBuild } from '@zyxw/tmpl'
import { layoutFileRead } from '@/src/layout/fileRead'

export async function layoutBuild({ root }: {
  root: string,
}) {
  // Read layout file
  const layoutFile = await layoutFileRead({ root })
  // Compile layout
  const layout = tmplBuild(layoutFile)
  return layout
}

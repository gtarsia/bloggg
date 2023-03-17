import { upreadPackageJson } from '@zyxw/utils-node'

export async function rootGet() {
  const { path } = await upreadPackageJson()
  const root = path.dir.absolute
  return root
}

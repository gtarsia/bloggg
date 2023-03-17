import { blogPostsDirMkdir } from './postsDirMkdir'
import { tmplBuild } from '@zyxw/tmpl'

export async function blogRender({ root, layout, posts }: {
  root: string,
  layout: {},
  posts: any[],
}) {
  await blogPostsDirMkdir(root)
}

export async function blogPostRender({ root, layout, post }: {
  root: string,
  layout: {},
  post: {},
}) {
  await blogPostsDirMkdir(root)
}

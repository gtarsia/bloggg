import { Renderable } from '@zyxw/tmpl'
import { postFilesRead } from '@/src/post/filesRead'
import { postRender } from '@/src/post/render'
import { postWrite } from '@/src/post/write'

export async function postFilesBuild({ layout, root }: {
  layout: Renderable,
  root: string,
}) {
  // Read posts files
  const posts = await postFilesRead({ root })

  // Write all docs/posts/ files
  const postsPromises = posts.map(async ({ name, contents, date }) => {
    const { title, body, tags } = await postRender({ contents })
    const doc = layout.render({ title, body })
    await postWrite({ root, name, doc })
    return { title, name, tags, date }
  })
  return Promise.all(postsPromises)
}

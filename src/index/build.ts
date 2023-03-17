import { writeFile } from 'node:fs/promises'
import nodePath from 'node:path'
import { Renderable } from '@zyxw/tmpl'

export async function indexBuild({ layout, root, posts }: {
  layout: Renderable,
  root: string,
  posts: { title?: string, name: string }[],
}) {
  const path = nodePath.join(root, 'docs', 'index.html')
  let body = ''
  for (const { name, title } of posts) {
    body += `<a href="/posts/${name}.html">${title || name}</a>`
  }
  const rendered = layout.render({ body })

  await writeFile(path, rendered, 'utf8')
}

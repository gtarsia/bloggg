import { writeFile } from 'node:fs/promises'
import nodePath from 'node:path'
import dayjs from 'dayjs'
import { Renderable } from '@zyxw/tmpl'

export async function indexBuild({ layout, root, posts }: {
  layout: Renderable,
  root: string,
  posts: { title?: string, name: string, tags: string[], date: string }[],
}) {
  const path = nodePath.join(root, 'docs', 'index.html')
  let body = ''
  // body += '<h1>Posts</h1>'
  for (const { name, title, tags, date } of posts) {
    body += `\
<li class="post-link">
  <div class="title">
    <a href="/blog/posts/${name}.html">${title || name}</a>
  </div>
  <div>
    ${date}
    &#x2022;
    ${tags.map(tag => `\
<a href="/docs/tags/${tag}" style="margin-right: 5px"><span>${tag}</span></a>\
`).join('')}
  </div>
</li>`
  }
  const rendered = layout.render({ body, title: 'My posts' })

  await writeFile(path, rendered, 'utf8')
}

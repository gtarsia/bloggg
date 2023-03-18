import { readFile } from 'node:fs/promises'
import nodePath from 'node:path'

// This function transforms an url into the path of a file it tries to read
// If the path ends with a slash, it will append a index.html
//  '/' => readFile(`${root}/index.html`)
//  '/docs' => if ${root}/docs is a dir, readFile(`${root}/docs/index.html`)
//             else, readFile(`${root}/docs`)
//  '/docs/' => readFile(`${root}/docs/index.html`)
// If reading a file results in an error (except the error of a file being a dir)
//    then null is returned
export async function webFileRead({ root, url }: {
  root: string,
  url: string,
}): Promise<{
  contents: Buffer | string,
  ext: string,
  path: string,
} | null> {
  try {
    const endsWithSlash = url.at(-1) === '/'
    const parts = url.split('/').filter(el => el)
    const path = nodePath.join(
      root, ...parts, endsWithSlash ? 'index.html' : '')
    const ext = nodePath.extname(path)
    const contents = await readFile(path, ext === '.png' ? null : 'utf8')
    return { contents, path, ext }
  } catch(err: any) {
    if (err.code === 'EISDIR') {
      console.log(url)
      const newUrl = nodePath.join(url, 'index.html')
      return webFileRead({ root, url: newUrl })
    }
    return null
  }
}

import nodePath from 'node:path'
import { readdir, readFile } from 'node:fs/promises'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'

dayjs.extend(localizedFormat)

const dateRe = /^\d+-\d+-\d+/

function sortBy<T>(key: keyof T) {
  return (a: T, b: T) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
}

export async function postFilesRead({ root }: {
  root: string
}) {
  const dir = nodePath.join(root, 'posts')
  const files = await readdir(dir, { withFileTypes: true })
  const nonDirs = files.filter(file => !file.isDirectory())
  const haveDate = nonDirs.reduce((arr, file) => {
    try {
      const result = file.name.match(dateRe)
      if (!result || !result[0]) {
        throw new Error('File does not match YYYY-MM-DD at start of file')
      }
      const date = dayjs(result[0], 'YYYY-MM-DD').format('LL')
      arr.push({ ...file, date })
    } catch (err: any) {
      console.error(`Failed while reading ${file.name}, reason: ${err.message}`)
    }
    return arr
  }, [] as Array<{ name: string, date: string }>)
  const sorted = haveDate.sort(sortBy('date')).reverse()
  const final = sorted
  const promises = final.map(async ({ name: mdName, date }) => {
    const path = nodePath.join(dir, mdName)
    const contents = await readFile(path, 'utf8')
    const { name } = nodePath.parse(mdName)
    return { name, contents, date }
  })
  const awaited = await Promise.all(promises)
  return awaited
}

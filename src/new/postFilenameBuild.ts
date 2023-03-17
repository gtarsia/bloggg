import { getFileDate } from './date'

export function newPostFilenameBuild(title: string) {
  const { year, month, day } = getFileDate()
  const lowerTitle = title.toLowerCase()
  const replaced = lowerTitle.replaceAll(' ', '-')
  const result = `${year}-${month}-${day}-${replaced}.md`
  return result
}

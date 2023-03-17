import { newPostFilenameBuild } from './postFilenameBuild'
import { getFileDate } from './date'

test('newPostFilenameBuild', () => {
  const { year, month, day } = getFileDate()
  expect(newPostFilenameBuild('Qwe asd zxc')).toBe(
    `${year}-${month}-${day}-qwe-asd-zxc.md`)
})


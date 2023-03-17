import { command, ZyxwUsageError } from '@zyxw/cli'

export function newCommand() {
  return command('new', {
  }).onExec(async (v, delimiter) => {
    const { pre } = delimiter
    const title = pre.join(' ')
    if (!title) {
      throw new ZyxwUsageError('empty post title passed')
    }
    return (await import('./run')).newRun({ title })
  }).strict(false)
}

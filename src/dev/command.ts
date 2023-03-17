import { command } from '@zyxw/cli'

export function devCommand() {
  return command('dev', {
  }).onExec(async (v) => {
    return (await import('./run')).devRun()
  })
}

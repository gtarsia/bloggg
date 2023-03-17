import { command } from '@zyxw/cli'

export function buildCommand() {
  return command('build', {
  }).onExec(async (v) => {
    return (await import('./run')).buildRun()
  })
}

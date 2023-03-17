import { StdioOptions, spawn as spawnCp, } from 'node:child_process'

export function styleSpawn({ cmds, cwd, onData }: {
  cmds: string[],
  cwd: string,
  onData?: (data: string) => void,
}) {
  const cmd = cmds.join(' && ')
  return new Promise((resolve, reject) => {
    const { SHELL: shell = '/bin/sh', } = process.env
    const stdio: StdioOptions = ['pipe', 'pipe', 'pipe']
    const p = spawnCp(shell, ['-c', cmd], {
      stdio,
      cwd,
    })
    const errors: string[] = []
    p.stdout?.on('data', (msg) => {
      process.stdout.write(msg)
      if (onData) onData(msg.toString())
    })
    p.stderr?.on('data', (err) => {
      process.stderr.write(err)
      if (onData) onData(err.toString())
    })
    p.on('close', (code) => {
      if (errors.length > 0) {
        return console.error(errors.join('\n'))
      }
      resolve(true)
    })
  })
}

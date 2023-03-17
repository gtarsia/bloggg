import { styleSpawn } from './spawn'

export function styleWatch({ root, reload }: {
  root: string,
  reload: () => void,
}) {
  const cmds = [
    'npx tailwindcss -i style.scss -o docs/style.css --watch',
  ]
  const cwd = root
  const onData = (data: string) => {
    if (data.startsWith('Done')) {
      reload()
    }
  }
  return styleSpawn({ cmds, cwd, onData })
}

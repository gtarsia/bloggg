import { styleSpawn } from './spawn'

export function styleBuild({ root }: {
  root: string,
}) {
  const cmds = [
    'npx tailwindcss -i style.scss -o docs/style.css',
  ]
  const cwd = root
  return styleSpawn({ cmds, cwd })
}

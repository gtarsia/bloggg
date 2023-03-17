import { tree } from '@zyxw/cli'
import { buildCommand } from './build/command'
import { devCommand } from './dev/command'
import { newCommand } from './new/command'

export async function bin() {
  const tr = tree('bloggg', [
    buildCommand(),
    devCommand(),
    newCommand(),
  ]).root()
  await tr.processArgv()
}

import http from 'node:http'
import nodePath from 'node:path'
import { readFile } from 'node:fs/promises'
import { WebSocketServer, WebSocket } from 'ws'
import {
  devServerResponseAutoreloaderInject
} from './serverResponseAutoreloaderInject'

export async function readFileSafe(path: string) {
  try {
    return await readFile(path, 'utf8')
  } catch(err) {
    return null
  }
}

export function devServerRun({ root }: {
  root: string,
}) {
  const server = http.createServer(async (req, res) => {
    const [url, query] = (req.url ?? '').split('?')
    const endsWithSlash = url.at(-1) === '/'
    const parts = url.split('/').filter(el => el)
    const path = nodePath.join(
      root, 'docs', ...parts, endsWithSlash ? 'index.html' : '')
    let contents = await readFileSafe(path)
    if (contents == null) {
      res.writeHead(404).end()
      return
    }
    if (nodePath.extname(path) === '.html') {
      // Inject script for autoreload
      contents = devServerResponseAutoreloaderInject(contents)
    }
    res.write(contents)
    res.end()
  })
  const wsSet = new Set<WebSocket>()
  const wss = new WebSocketServer({ server })
  let reloadOnConnection = false
  wss.on('connection', (ws) => {
    wsSet.add(ws)
    ws.on('error', console.error)
    ws.on('close', () => {
      wsSet.delete(ws)
    })
    if (reloadOnConnection) {
      reloadOnConnection = false
      ws.send('reload')
    }
  })
  server.listen('4343')
  const reload = () => {
    if (wsSet.size === 0) {
      reloadOnConnection = true
    }
    for (const ws of wsSet) {
      ws.send('reload')
    }
  }
  return { reload }
}

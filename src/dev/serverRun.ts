import http from 'node:http'
import nodePath from 'node:path'
import { readFile } from 'node:fs/promises'
import { WebSocketServer, WebSocket } from 'ws'
import { webFileRead } from '@/src/lib/webFileRead'
import {
  devServerResponseAutoreloaderInject
} from './serverResponseAutoreloaderInject'

export function devServerRun({ root }: {
  root: string,
}) {
  const server = http.createServer(async (req, res) => {
    const [_url, query] = (req.url ?? '').split('?')
    const url = _url.replace(/^\/blog/, '/docs')
    const file = await webFileRead({ root, url })
    if (file == null) {
      res.writeHead(404).end()
      return
    }
    let { contents } = file
    if (file.ext === '.html' && typeof contents === 'string') {
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


export function devServerResponseAutoreloaderInject(contents: string) {
  return contents.replace('</body>', `<script>
function devServerWebsocket() {
  const socket = new WebSocket(\`ws://\${location.host}\`);

  socket.addEventListener("message", (event) => {
    if (event.data === 'reload') {
      location.reload()
    }
  })
  socket.addEventListener("close", () => {
    setTimeout(() => devServerWebsocket(), 2000)
  })
  socket.addEventListener("error", () => {
    setTimeout(() => devServerWebsocket(), 2000)
  })
}
devServerWebsocket()

</script></body>`)
}

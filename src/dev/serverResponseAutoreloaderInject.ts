
export function devServerResponseAutoreloaderInject(contents: string) {
  return contents.replace('</body>', `<script>
const socket = new WebSocket(\`ws://\${location.host}\`);

// Listen for messages
socket.addEventListener("message", (event) => {
  if (event.data === 'reload') {
    location.reload()
  }
});

</script></body>`)
}

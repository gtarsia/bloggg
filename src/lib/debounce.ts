
export function debounce<T extends Function>(
  fn: T,
  delay: number
) {
  let timer: undefined | NodeJS.Timeout = undefined
  let callable = (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
  return <T>(<any>callable)
}

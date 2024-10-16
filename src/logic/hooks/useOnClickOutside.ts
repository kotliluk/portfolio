import { useCallback, useEffect } from "react"


export const useOnClickOutside = (elementId: string, callback: () => void): void => {
  const listener = useCallback((ev: MouseEvent) => {
    const element = document.getElementById(elementId)

    if (!element) {
      return
    }

    const contains = element.contains(ev.target as HTMLElement)

    if (!contains) {
      callback()
    }
  }, [elementId, callback])

  useEffect(() => {
    document.addEventListener('click', listener)

    return () => document.removeEventListener('click', listener)
  }, [listener])
}

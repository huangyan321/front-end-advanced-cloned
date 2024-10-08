// @copy https://github.com/streamich/react-use/blob/master/src/useClickAway.ts
import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    | [string, (...args: any[]) => any | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>),
    )
  }
}

function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, (...args: any[]) => any | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>),
    )
  }
}

const defaultEvents = ['mousedown', 'touchstart']

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents,
) => {
  const savedCallback = useRef(onClickAway)
  useEffect(() => {
    savedCallback.current = onClickAway
  }, [onClickAway])
  useEffect(() => {
    const handler = (event: React.MouseEvent) => {
      const { current: el } = ref
      if (el && !el.contains(event.target as any)) {
        savedCallback.current(event as any)
      }
    }
    for (const eventName of events) {
      on(document, eventName, handler)
    }
    return () => {
      for (const eventName of events) {
        off(document, eventName, handler)
      }
    }
  }, [events, ref])
}

export default useClickAway

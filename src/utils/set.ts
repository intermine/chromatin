import type { Ref } from './types'

export const setRef = (ref?: Ref, el?: HTMLElement): void => {
    if (typeof ref === 'undefined') return

    if (typeof ref === 'function') {
        ref(el)
    } else if (ref) {
        ref.current = el
    }
}

import { useMemo } from 'react'

import type { CallableRef, Ref } from './types'

const updateRef = (ref?: Ref, el?: HTMLElement) => {
    if (typeof ref === 'undefined') return

    if (typeof ref === 'function') {
        ref(el)
    } else if (ref) {
        ref.current = el
    }
}

const useForkRef = (
    refA: Ref | undefined,
    refB: Ref | undefined
): CallableRef | null => {
    return useMemo(() => {
        if (refA == null && refB == null) {
            return null
        }

        return (refValue?: HTMLElement) => {
            updateRef(refA, refValue)
            updateRef(refB, refValue)
        }
    }, [refA, refB])
}

export { useForkRef }

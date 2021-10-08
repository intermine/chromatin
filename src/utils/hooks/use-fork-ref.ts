import { useMemo } from 'react'
import { setRef } from '../set'

import type { CallableRef, Ref } from '../types'

const useForkRef = (
    refA: Ref | undefined,
    refB: Ref | undefined
): CallableRef | null => {
    return useMemo(() => {
        if (refA == null && refB == null) {
            return null
        }

        return (refValue?: HTMLElement) => {
            setRef(refA, refValue)
            setRef(refB, refValue)
        }
    }, [refA, refB])
}

export { useForkRef }

import { __DEV__ } from '../constants/env'

export const attachSignatureToComponent = <T>(
    Component: T,
    id: string
): void => {
    if (typeof id !== 'string') {
        if (__DEV__) {
            console.error(
                [
                    '[Chromatin - attachSignatureToComponent]: id is required,',
                    `and it must be a string. Got: ${typeof id}`,
                ].join(' ')
            )
        }
        return
    }

    Object.defineProperties<T>(Component, {
        isChromatinElement: {
            value: true,
            writable: false,
        },
        componentId: {
            value: id,
            writable: false,
        },
    })
}

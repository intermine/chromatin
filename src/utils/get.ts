import { nanoid } from 'nanoid'

import { isChromatinElement } from './validate'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getChromatinElementId = (Component: any): string | undefined => {
    if (!isChromatinElement(Component)) {
        return
    }

    if (typeof Component === 'object') {
        return Component.type.componentId as string
    }

    return Component.componentId as string
}

export const getId = (size = 7): string => {
    return nanoid(size)
}

export const getElementUsingEvent = (event: Event): EventTarget => {
    if (event.composed && typeof event.composedPath === 'function') {
        return event.composedPath()[0]
    }

    return event.target ?? document.body
}

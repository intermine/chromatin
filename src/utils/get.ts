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

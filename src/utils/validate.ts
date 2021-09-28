import { isProdEnv } from './misc'

export const isValidAnchorElement = (
    anchorElement?: Element
): anchorElement is Element => {
    if (anchorElement === null) return false

    if (!anchorElement || typeof anchorElement !== 'object') {
        if (!isProdEnv()) {
            console.error(
                [
                    '[Chromatin - Popper]: Anchor Element is not defined.',
                    'Expecting anchorElement as HTML Element, ',
                    `Got: ${typeof anchorElement}`,
                ].join(' ')
            )
        }

        return false
    }

    const element = anchorElement.getBoundingClientRect()

    if (
        process.env.NODE_ENV !== 'test' &&
        element.top === 0 &&
        element.left === 0 &&
        element.right === 0 &&
        element.bottom === 0
    ) {
        if (!isProdEnv()) {
            console.error(
                [
                    '[Chromatin - Popper]: anchorElement is not the',
                    'part of the layout. Make sure that anchorElement',
                    'is the part of the layout.',
                ].join(' ')
            )
        }
        return false
    }

    return true
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isChromatinElement = (Component: any): boolean => {
    if (!Component) return false

    if (Component.isChromatinElement) return true
    if (Component.type?.isChromatinElement) return true

    return false
}

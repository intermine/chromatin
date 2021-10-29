export const isValidAnchorElement = (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    anchorElement: any
): anchorElement is Element => {
    if (anchorElement === null) return false

    if (!anchorElement || typeof anchorElement !== 'object') {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                [
                    '[Chromatin - isValidAnchorElement]: Anchor Element is not',
                    ' defined. Expecting anchorElement as HTML Element, ',
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
        if (process.env.NODE_ENV !== 'production') {
            console.warn(
                [
                    '[Chromatin - isValidAnchorElement]: Anchor Element',
                    'is not the part of the layout. Make sure that',
                    'Anchor Element is the part of the layout.',
                ].join(' '),
                'Element:',
                anchorElement,
                'Rect:',
                anchorElement.getBoundingClientRect()
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

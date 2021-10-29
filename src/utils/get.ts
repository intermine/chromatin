import { nanoid } from 'nanoid'
import {
    BasicColor,
    getColorNameAndKey,
    getThemeColorUsingKey,
    Theme,
    themeTernaryOperator as tto,
} from '../styles'

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

export const getColorForComponent = (options: {
    theme: Theme
    color?: string
    key?: string
    isReturnDefaultColor?: boolean
    isSwitchDefaultColor?: boolean
    defaultKey?: {
        grey?: keyof BasicColor
        darkGrey?: keyof BasicColor
    }
}): string | undefined => {
    const {
        key,
        theme,
        color,
        isReturnDefaultColor = true,
        isSwitchDefaultColor = false,
        defaultKey = {},
    } = options

    if (!color) {
        if (!isReturnDefaultColor) return

        const {
            themeType,
            palette: { darkGrey, grey },
        } = theme

        const { grey: _gK = 10, darkGrey: _dgK = 10 } = defaultKey

        if (isSwitchDefaultColor) {
            return tto(themeType, grey[_gK], darkGrey[_dgK])
        }
        return tto(themeType, darkGrey[_dgK], grey[_dgK])
    }

    const colorTuple = getColorNameAndKey(color, { theme, defaultKey: key })

    if (colorTuple) {
        return getThemeColorUsingKey(colorTuple, theme)
    }

    return color
}

export const getNeutralBasicColorForComponent = (options: {
    theme: Theme
    isOpposite?: boolean
}): BasicColor => {
    const { theme, isOpposite = false } = options
    const {
        themeType,
        palette: { darkGrey, grey },
    } = theme

    if (isOpposite) {
        return tto(themeType, darkGrey, grey)
    }

    return tto(themeType, grey, darkGrey)
}

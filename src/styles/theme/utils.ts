import { Theme, ThemeColorName, ThemePaletteColor } from './create'
import { isProdEnv } from '../../utils'
import { isThemeColorName, isThemePaletteColorKey } from './validate'
import { isBasicColorKey } from '../colors/utils'
import type { BasicColor, ThemeType } from '../colors'

export const themeTernaryOperator = <T>(theme: ThemeType, v1: T, v2: T): T =>
    theme === 'light' ? v1 : v2

export type ColorAndKeyTuple = [ThemeColorName, keyof ThemePaletteColor]

export const getColorNameAndKey = (
    color: string,
    options = {} as { theme: Theme; defaultKey?: string }
): ColorAndKeyTuple | undefined => {
    if (typeof color !== 'string') {
        if (!isProdEnv()) {
            console.error(
                '[Chromatin - getColorNameAndKey]: Expecting '.concat(
                    'color as string. Got: ',
                    typeof color
                )
            )
        }
        return
    }

    const { theme, defaultKey = 'main' } = options

    const [colorName, key = defaultKey] = color.split('.')

    if (colorName === undefined) {
        return
    }

    if (isThemeColorName(colorName, theme) && isThemePaletteColorKey(key)) {
        return [colorName, key]
    }
}

export const getThemeColorUsingKey = (
    colorTuple: ColorAndKeyTuple,
    theme: Theme
): string => {
    if (!Array.isArray(colorTuple)) {
        if (!isProdEnv()) {
            console.error(
                '[Chromatin - getThemeColorUsingKey]: Expecting'.concat(
                    'colorTuple but Got:  ',
                    typeof colorTuple
                )
            )
        }
        return ''
    }

    const [color, key] = colorTuple

    if (color.startsWith('$')) {
        try {
            const colorName = color.slice(1)
            return (theme.palette.other[colorName] as any)[key]
        } catch {
            if (!isProdEnv()) {
                console.error(
                    '[Chromatin - getThemeColorUsingKey]: Other color '.concat(
                        'is not defined. theme.palette.other.',
                        color.slice(1),
                        '.',
                        key.toString(),
                        ' throw error'
                    )
                )
            }
            return ''
        }
    }

    if (color === 'grey' || color === 'darkGrey') {
        if (isBasicColorKey(key)) {
            return theme.palette[color][key]
        }

        let _key: keyof BasicColor = 50

        if (key === 'mainDarkShade') _key = 60
        if (key === 'mainLightShade') _key = 40

        return theme.palette[color][_key]
    }

    return theme.palette[color][key]
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
            return themeTernaryOperator(themeType, grey[_gK], darkGrey[_dgK])
        }
        return themeTernaryOperator(themeType, darkGrey[_dgK], grey[_dgK])
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
        return themeTernaryOperator(themeType, darkGrey, grey)
    }

    return themeTernaryOperator(themeType, grey, darkGrey)
}

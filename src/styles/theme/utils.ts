import { Theme, ThemeColorName, ThemePaletteColor } from './create'
import { isProdEnv } from '../../utils'
import { isThemeColorName, isThemePaletteColorKey } from './validate'
import { isBasicColorKey } from '../colors/utils'
import type { BasicColor } from '../colors/color'

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

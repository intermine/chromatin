import { isBasicColorKey } from '../colors/utils'

import type {
    ThemeColorName,
    ThemeTypographyVariant,
    Theme,
    ThemePaletteColor,
} from './create'

export const isThemeColorName = (
    colorName: string,
    theme?: Theme
): colorName is ThemeColorName => {
    if (typeof colorName !== 'string') {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[Chromatin - isThemeColorName]: Expecting '.concat(
                    'colorName as string. Got: ',
                    typeof colorName
                )
            )
        }
        return false
    }

    if (
        colorName === 'primary' ||
        colorName === 'secondary' ||
        colorName === 'success' ||
        colorName === 'error' ||
        colorName === 'warning' ||
        colorName === 'info' ||
        colorName === 'neutral' ||
        colorName === 'disable' ||
        colorName === 'grey' ||
        colorName === 'darkGrey'
    ) {
        return true
    }

    if (!theme) return false

    if (colorName.startsWith('$')) {
        const otherColorName = colorName.slice(1)
        return otherColorName in theme.palette.other
    }

    return false
}

export const isThemeFontVariant = (
    name: string
): name is ThemeTypographyVariant => {
    if (typeof name !== 'string') {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[Chromatin - isThemeFontVariant]: Expecting '.concat(
                    'name as string. Got: ',
                    typeof name
                )
            )
        }
        return false
    }

    if (
        name === 'h1' ||
        name === 'h2' ||
        name === 'h3' ||
        name === 'h4' ||
        name === 'h5' ||
        name === 'h6' ||
        name === 'body' ||
        name === 'bodyLg' ||
        name === 'bodySm' ||
        name === 'caption' ||
        name === 'title' ||
        name === 'small'
    )
        return true
    return false
}

export const isThemePaletteColorKey = (
    key: string | number
): key is keyof ThemePaletteColor => {
    if (typeof key !== 'string' && typeof key !== 'number') {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[Chromatin - isThemePaletteColorKey]: Expecting '.concat(
                    'key as string or number. Got: ',
                    typeof key
                )
            )
        }
        return false
    }

    if (
        isBasicColorKey(key) ||
        key == 'main' ||
        key == 'text' ||
        key == 'mainLightShade' ||
        key == 'mainDarkShade'
    ) {
        return true
    }
    return false
}

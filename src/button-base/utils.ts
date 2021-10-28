import { CSSObject } from 'styled-components'
import {
    getColorNameAndKey,
    getThemeColorUsingKey,
    getTintOrShade,
    hex2rgba,
    isValidColorHex,
    Theme,
} from '../styles'

export type GetHoverPropertiesOptions = {
    color?: string
    isDisabled: boolean
    variant: string
    theme: Theme
}

export const getHoverProperties = (
    options = {} as GetHoverPropertiesOptions
): CSSObject => {
    const { color, isDisabled, theme, variant } = options

    if (!color || isDisabled) return {}

    const { themeType, palette } = theme
    const { hover } = palette

    const colorTuple = getColorNameAndKey(color, { theme })

    if (variant === 'normal') {
        if (colorTuple) {
            return {
                background: getThemeColorUsingKey(
                    [colorTuple[0], 'mainDarkShade'],
                    theme
                ),
            }
        }

        if (isValidColorHex(color)) {
            return {
                background: getTintOrShade(
                    color,
                    themeType !== 'light',
                    hover.tintOrShadeFactor
                ),
            }
        }

        return { opacity: hover.unknownColorOpacity }
    }

    if (colorTuple) {
        return {
            background: hex2rgba(
                getThemeColorUsingKey(colorTuple, theme),
                hover.ghostElementBackgroundOpacity
            ).rgba,
        }
    }

    if (isValidColorHex(color)) {
        return {
            background: hex2rgba(color, hover.ghostElementBackgroundOpacity)
                .rgba,
        }
    }

    return {
        opacity: hover.unknownColorOpacity,
    }
}

export type GetActivePropertiesOptions = GetHoverPropertiesOptions

export const getActiveProperties = (
    options = {} as GetActivePropertiesOptions
): CSSObject => {
    const { color, isDisabled, theme, variant } = options
    if (!color || isDisabled) return {}

    const colorTuple = getColorNameAndKey(color, { theme })

    const { palette, themeType } = theme
    const { active } = palette

    if (variant === 'normal') {
        if (colorTuple) {
            return {
                background: getThemeColorUsingKey(
                    [colorTuple[0], 'mainLightShade'],
                    theme
                ),
            }
        }
        if (isValidColorHex(color)) {
            return {
                background: getTintOrShade(
                    color,
                    themeType === 'light',
                    active.tintOrShadeFactor
                ),
            }
        }
        return { opacity: 1 }
    }

    if (colorTuple) {
        return {
            background: hex2rgba(
                getThemeColorUsingKey(colorTuple, theme),
                active.ghostElementBackgroundOpacity
            ).rgba,
        }
    }

    if (isValidColorHex(color)) {
        return {
            background: hex2rgba(color, active.ghostElementBackgroundOpacity)
                .rgba,
        }
    }

    return { opacity: 1 }
}

import { CSSObject } from 'styled-components'
import {
    getTintOrShade,
    hex2rgba,
    isThemeColorName,
    isValidColorHex,
    Theme,
} from '../styles'

export type GetHoverPropertiesOptions = {
    color: string
    disabled: boolean
    variant: string
    mainColor: string
    theme: Theme
}

export const getHoverProperties = (
    options = {} as GetHoverPropertiesOptions
): CSSObject => {
    const { color, disabled, mainColor, theme, variant } = options

    if (!color || disabled) return {}

    const { themeType, palette } = theme
    const { hover } = palette

    if (variant === 'normal') {
        if (!isThemeColorName(color)) {
            if (!isValidColorHex(color))
                return { opacity: hover.unknownColorOpacity }
            return {
                background: getTintOrShade(
                    color,
                    themeType !== 'light',
                    hover.tintOrShadeFactor
                ),
            }
        }

        return {
            background: palette[color].mainDarkShade,
        }
    }

    if (!isThemeColorName(color)) {
        if (!isValidColorHex(color))
            return {
                opacity: hover.unknownColorOpacity,
            }
        return {
            background: hex2rgba(color, hover.ghostElementBackgroundOpacity)
                .rgba,
        }
    }

    console.log(
        'Theme color',
        hex2rgba(mainColor, hover.ghostElementBackgroundOpacity).rgba
    )
    return {
        background: hex2rgba(mainColor, hover.ghostElementBackgroundOpacity)
            .rgba,
    }
}

export type GetActivePropertiesOptions = Omit<
    GetHoverPropertiesOptions,
    'mainColor'
>

export const getActiveProperties = (
    options = {} as GetActivePropertiesOptions
): CSSObject => {
    const { color, disabled, theme, variant } = options
    const { palette, themeType } = theme
    const { active } = palette

    if (!color || disabled) return {}

    if (variant === 'normal') {
        if (!isThemeColorName(color)) {
            if (!isValidColorHex(color)) return { opacity: 1 }
            return {
                background: getTintOrShade(
                    color,
                    themeType === 'light',
                    active.tintOrShadeFactor
                ),
            }
        }

        return {
            background: palette[color].mainLightShade,
        }
    }

    if (!isThemeColorName(color)) {
        if (!isValidColorHex(color)) return { opacity: 1 }
        return {
            background: hex2rgba(color, active.ghostElementBackgroundOpacity)
                .rgba,
        }
    }

    return {
        background: palette[color][10],
    }
}

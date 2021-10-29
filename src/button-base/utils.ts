import { CSSObject } from 'styled-components'
import {
    getColorNameAndKey,
    getThemeColorUsingKey,
    getTintOrShade,
    hex2rgba,
    isValidColorHex,
    Theme,
    themeTernaryOperator as tto,
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

    if (isDisabled) return {}

    const { themeType, palette } = theme
    const { hover, darkGrey, grey } = palette

    let _color = color ?? tto(themeType, grey[10], darkGrey[30])

    const colorTuple = getColorNameAndKey(_color, { theme })

    if (variant === 'normal') {
        if (colorTuple) {
            _color = colorTuple[0]
        }

        if (isValidColorHex(_color)) {
            return {
                background: getTintOrShade(
                    _color,
                    themeType !== 'light',
                    hover.tintOrShadeFactor
                ),
            }
        }

        return { opacity: hover.unknownColorOpacity }
    }

    if (colorTuple) {
        _color = colorTuple[0]
    }

    if (!color && !colorTuple) {
        _color = tto(themeType, darkGrey[10], grey[10])
    }

    if (isValidColorHex(_color)) {
        return {
            background: hex2rgba(_color, hover.ghostElementBackgroundOpacity)
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
    if (isDisabled) return {}

    const { palette, themeType } = theme
    const { active, grey, darkGrey } = palette

    let _color = color ?? tto(themeType, grey[10], darkGrey[30])
    const colorTuple = getColorNameAndKey(_color, { theme })

    if (variant === 'normal') {
        if (colorTuple) {
            _color = colorTuple[0]
        }

        if (isValidColorHex(_color)) {
            return {
                background: getTintOrShade(
                    _color,
                    themeType === 'light',
                    active.tintOrShadeFactor
                ),
            }
        }
        return { opacity: 1 }
    }

    if (colorTuple) {
        _color = colorTuple[0]
    }

    if (!color && !colorTuple) {
        _color = tto(themeType, darkGrey[10], grey[10])
    }

    if (isValidColorHex(_color)) {
        return {
            background: hex2rgba(_color, active.ghostElementBackgroundOpacity)
                .rgba,
        }
    }

    return { opacity: 1 }
}

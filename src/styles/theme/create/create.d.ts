import { CSSObject } from 'styled-components'
import { ButtonBaseCommonProps } from '../../../button-base/button-base'
import { BasicColor, CreateColorOptions } from '../../colors'
import { ThemeType } from '../../colors/color'
import { FontMixinReturn, namedTypographyScales } from '../../typography'

/**
 * -----------------------------
 * Theme Vars
 * -----------------------------
 */
export type ThemeVariableFunction<T> = (
    theme: Omit<Theme, 'themeVars'>,
    props: T
) => CSSObject

export type ThemeVars = {
    button: ThemeVariableFunction<any>
    buttonBase: ThemeVariableFunction<ButtonBaseCommonProps>
}
export type CreateThemeVarsOptions = Partial<ThemeVars>

/**
 * -----------------------------
 * Color Palette
 * -----------------------------
 */
export type ThemePaletteColor = BasicColor & {
    main: string
    text: string
    mainLightShade: string
    mainDarkShade: string
}

export type ThemeColorName =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'warning'

export type ThemePalette = {
    primary: ThemePaletteColor
    secondary: ThemePaletteColor
    error: ThemePaletteColor
    warning: ThemePaletteColor
    info: ThemePaletteColor
    common: {
        black: string
        white: string
    }
    contrastThreshold: number
    themeType: ThemeType
    grey: BasicColor
    darkGrey: BasicColor
    hover: {
        opacity: number
        tintOrShadeFactor: number
    }
    focus: {
        borderOpacity: number
    }
}

export type CreateThemePaletteOptionsColorType =
    | string
    | ({ baseColor: string } & CreateColorOptions)
    | (() => ThemePaletteColor)

export type CreateThemePaletteOptions = {
    primary?: CreateThemePaletteOptionsColorType
    secondary?: CreateThemePaletteOptionsColorType
    error?: CreateThemePaletteOptionsColorType
    warning?: CreateThemePaletteOptionsColorType
    info?: CreateThemePaletteOptionsColorType
    grey?: BasicColor
    darkGrey?: BasicColor
    themeType?: ThemeType
    contrastThreshold?: number
    hover?: {
        opacity?: number
        tintOrShadeFactor?: number
    }
    focus?: {
        borderOpacity?: number
    }
}

/**
 * -----------------------------
 * Typography
 * -----------------------------
 */
export type ThemeTypographyTagsProperties = FontMixinReturn

export type ThemeTypography = {
    h1: ThemeTypographyTagsProperties
    h2: ThemeTypographyTagsProperties
    h3: ThemeTypographyTagsProperties
    h4: ThemeTypographyTagsProperties
    h5: ThemeTypographyTagsProperties
    h6: ThemeTypographyTagsProperties
    body: ThemeTypographyTagsProperties
    bodySm: ThemeTypographyTagsProperties
    caption: ThemeTypographyTagsProperties
    title: ThemeTypographyTagsProperties
    small: ThemeTypographyTagsProperties
    meta: {
        // document font size in px.
        documentFontSize: number
    }
}

export type CreateThemeTypographyOptionsObject = {
    scale?: number | keyof typeof namedTypographyScales
    /**
     * Document font size is in px. Only give the number value.
     */
    documentFontSize?: number
    fontFamily?: {
        bold?: { name?: string; weight?: number; lineHeight?: number }
        regular?: { name?: string; weight?: number; lineHeight?: number }
        medium?: { name?: string; weight?: number; lineHeight?: number }
    }
}

export type CreateThemeTypographyOptions =
    | CreateThemeTypographyOptionsObject
    | (() => ThemeTypography)

/**
 * -----------------------------
 * Elevation
 * -----------------------------
 */
export type ThemeElevation = {
    none: string
    low: string
    medium: string
    high: string
    themeType: ThemeType
}

export type CreateThemeElevationOptions = Partial<ThemeElevation> & {
    themeType?: ThemeType
}

/**
 * -----------------------------
 * Theme
 * -----------------------------
 */
export type Theme = {
    themeVars: ThemeVars
    palette: ThemePalette
    typography: ThemeTypography
    elevation: ThemeElevation
}

export type CreateThemeOptions = {
    themeVars?: CreateThemeVarsOptions
    palette?: CreateThemePaletteOptions
    typography?: CreateThemeTypographyOptions
    elevation?: CreateThemeElevationOptions
}

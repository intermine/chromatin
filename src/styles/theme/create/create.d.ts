import { CSSProperties } from 'react'
import { BasicColor, CreateColorOptions } from '../../colors'
import { ThemeType } from '../../colors/color'

/**
 * -----------------------------
 * Theme Vars
 * -----------------------------
 */
export type ThemeVariableFunction<T> = (theme: Theme, props: T) => CSSProperties
export type ThemeVars = {
    button: ThemeVariableFunction<any>
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
    themeType?: ThemeType
    contrastThreshold?: number
}

/**
 * -----------------------------
 * Typography
 * -----------------------------
 */
export type ThemeTypographyTagsProperties = {
    fontSize: string
    fontFamily: string
    fontWeight: string
    lineHeight: string
}

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
    xs: ThemeTypographyTagsProperties
}

export type CreateThemeTypographyOptions = Partial<ThemeTypography>

/**
 * -----------------------------
 * Theme
 * -----------------------------
 */
export type Theme = {
    themeVars: ThemeVars
    palette: ThemePalette
    typography: ThemeTypography
}

export type CreateThemeOptions = {
    themeVars?: CreateThemeVarsOptions
    palette?: CreateThemePaletteOptions
    typography?: CreateThemeTypographyOptions
}

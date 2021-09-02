import { CSSProperties } from 'react'

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
export type ThemePaletteColor = any
export type ThemePalette = {
    primary: ThemePaletteColor
    secondary: ThemePaletteColor
    error: ThemePaletteColor
    warning: ThemePaletteColor
    info: ThemePaletteColor
}
export type CreateThemePaletteOptions = Partial<ThemePalette>

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

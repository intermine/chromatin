import { CSSObject } from 'styled-components'
import { BasicColor, CreateColorOptions } from '../../colors'
import { ThemeType } from '../../colors/color'
import { FontMixinReturn, namedTypographyScales } from '../../typography'

// Component Props
import {
    ButtonProps,
    ButtonBaseCommonProps,
    IconButtonProps,
    ButtonGroupProps,
    InputBaseProps,
    InputProps,
} from '../../..'

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
    button: ThemeVariableFunction<ButtonProps<'button'>>
    buttonBase: ThemeVariableFunction<ButtonBaseCommonProps>
    iconButton: ThemeVariableFunction<IconButtonProps<'button'>>
    buttonGroup: ThemeVariableFunction<ButtonGroupProps>
    inputBase: ThemeVariableFunction<InputBaseProps>
    input: ThemeVariableFunction<InputProps>
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
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'neutral'

export type ThemePalette = {
    recommendedThemeBackground: {
        [x in ThemeType]: string
    }
    primary: ThemePaletteColor
    secondary: ThemePaletteColor
    success: ThemePaletteColor
    error: ThemePaletteColor
    warning: ThemePaletteColor
    info: ThemePaletteColor
    neutral: ThemePaletteColor
    disable: ThemePaletteColor
    common: {
        black: string
        white: string
    }
    contrastThreshold: number
    themeType: ThemeType
    grey: BasicColor
    darkGrey: BasicColor
    hover: {
        ghostElementBackgroundOpacity: number
        unknownColorOpacity: number
        tintOrShadeFactor: number
    }
    active: {
        unknownColorOpacity: number
        tintOrShadeFactor: number
        ghostElementBackgroundOpacity: number
    }
    focus: {
        borderOpacity: number
        unknownColorBorderOpacity: number
    }
}

export type ThemeColors = {
    primary: ThemePalette['primary']
    secondary: ThemePalette['secondary']
    success: ThemePalette['success']
    error: ThemePalette['error']
    warning: ThemePalette['warning']
    info: ThemePalette['info']
    disable: ThemePalette['disable']
    neutral: ThemePalette['neutral']
    common: ThemePalette['common']
}

export type CreateThemePaletteOptionsColorType =
    | string
    | ({ baseColor: string } & CreateColorOptions)
    | (() => ThemePaletteColor)

export type CreateThemePaletteOptions = {
    primary?: CreateThemePaletteOptionsColorType
    secondary?: CreateThemePaletteOptionsColorType
    success?: CreateThemePaletteOptionsColorType
    error?: CreateThemePaletteOptionsColorType
    warning?: CreateThemePaletteOptionsColorType
    info?: CreateThemePaletteOptionsColorType
    neutral?: CreateThemePaletteOptionsColorType
    disable?: CreateThemePaletteOptionsColorType
    grey?: BasicColor
    darkGrey?: BasicColor
    themeType?: ThemeType
    contrastThreshold?: number
    hover?: {
        ghostElementBackgroundOpacity?: number
        unknownColorOpacity?: number
        tintOrShadeFactor?: number
    }
    active?: {
        tintOrShadeFactor?: number
        unknownColorOpacity?: number
        ghostElementBackgroundOpacity?: number
    }
    focus?: {
        borderOpacity?: number
        unknownColorBorderOpacity?: number
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
    bodyLg: ThemeTypographyTagsProperties
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
 * Spacing
 * -----------------------------
 */
export type ThemeSpacing = (...args: (string | number)[]) => string
export type CreateThemeSpacingOptions =
    | ((...factor: (number | string)[]) => string)
    | number
    | string[]

/**
 * -----------------------------
 * Breaking Points
 * -----------------------------
 */
export type ThemeBreakingPoints = {
    max: (screen: string) => string
    min: (screen: string) => string
    range: (startScreen: string, endScreen: string) => string
    baseFontSize: number
    keys: string[]
    values: { [x: string]: number }
    unit: string
}

export type CreateThemeBreakingPointsOptions = {
    // In px
    sm?: number
    // In px
    md?: number
    // In px
    lg?: number
    // In px
    xl?: number
    /**
     * This is used for the conversion from px to em.
     * @default typography.meta.documentFontSize
     */
    baseFontSize?: number
} & {
    // If some extra breaking points are needed.
    [x: string]: number
}

/**
 * -----------------------------
 * Transitions
 * -----------------------------
 */
export type ThemeTransitions = (...args: (string | number)[]) => string
export type CreateThemeTransitionOptions = any
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
    themeType: ThemeType
    themeVars: ThemeVars
    palette: ThemePalette
    typography: ThemeTypography
    elevation: ThemeElevation
    spacing: ThemeSpacing
    breakingPoints: ThemeBreakingPoints
}

export type CreateThemeOptions = {
    themeType?: ThemeType
    themeVars?: CreateThemeVarsOptions
    palette?: CreateThemePaletteOptions
    typography?: CreateThemeTypographyOptions
    elevation?: CreateThemeElevationOptions
    spacing?: CreateThemeSpacingOptions
    breakingPoints?: CreateThemeBreakingPointsOptions
}

export type ReactElement =
    | React.ReactNode
    | Element
    | React.ReactChildren
    | undefined
    | null
    | ReactElement[]

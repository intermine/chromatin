export { createTheme, isThemeColorName } from './theme'
export { createThemeVars } from './theme-vars'
export { createElevation } from './elevation'
export { createPalette } from './palette'
export { createStyledComponent, createStyle } from './style'
export { createTypography } from './typography'
export { createBreakingPoints } from './breaking-points'
export { createSpacing } from './spacing'

export type {
    Component as StyleComponent,
    CreateStyledComponentFunction,
    CreateStyledComponentFunctionProps,
    CreateStyledComponentObject,
    CreateStyledComponentObjectOrFunction,
} from './style'

export type {
    Theme,
    ThemeVars,
    ThemeBreakingPoints,
    ThemeSpacing,
    ThemeTransitions,
    ThemeColorName,
    ThemeElevation,
    ThemePalette,
    ThemeColors,
    ThemePaletteColor,
    ThemeTypography,
    ThemeTypographyTagsProperties,
    ThemeVariableFunction,
    CreateThemeVarsOptions,
    CreateThemeElevationOptions,
    CreateThemeOptions,
    CreateThemePaletteOptions,
    CreateThemePaletteOptionsColorType,
    CreateThemeTypographyOptions,
    CreateThemeTypographyOptionsObject,
    CreateThemeBreakingPointsOptions,
    CreateThemeSpacingOptions,
    CreateThemeTransitionOptions,
    ReactElement,
} from './create'

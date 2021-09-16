export { createTheme, isThemeColorName } from './theme'
export { createThemeVars } from './theme-vars'
export { createElevation } from './elevation'
export { createPalette } from './palette'
export { createStyledComponent, createStyle } from './style'
export { createTypography } from './typography'

export type {
    Component as StyleComponent,
    CreateStyledComponentFunction,
    CreateStyledComponentFunctionProps,
    CreateStyledComponentObject,
    CreateStyledComponentObjectOrFunction,
} from './style'

export type {
    Theme,
    CreateThemeVarsOptions,
    ThemeVars,
    CreateThemeElevationOptions,
    CreateThemeOptions,
    CreateThemePaletteOptions,
    CreateThemePaletteOptionsColorType,
    CreateThemeTypographyOptions,
    CreateThemeTypographyOptionsObject,
    ThemeColorName,
    ThemeElevation,
    ThemePalette,
    ThemePaletteColor,
    ThemeTypography,
    ThemeTypographyTagsProperties,
    ThemeVariableFunction,
    ReactElement,
} from './create'

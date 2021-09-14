import ThemeContext from './theme-context'
import ThemeProvider from './theme-provider'
export { defaultTheme } from './default-theme'

export { ThemeContext, ThemeProvider }
export { useTheme } from './use-theme'

export {
    createTheme,
    isThemeColorName,
    createThemeVars,
    createStyle,
    createTypography,
    createPalette,
    createElevation,
} from './create'

export type {
    ThemeVars,
    ThemeVariableFunction,
    ThemeTypographyTagsProperties,
    ThemeTypography,
    ThemePaletteColor,
    ThemePalette,
    ThemeElevation,
    ThemeColorName,
    Theme,
    StyleComponent,
    CreateThemeVarsOptions,
    CreateThemeTypographyOptionsObject,
    CreateThemeTypographyOptions,
    CreateThemePaletteOptionsColorType,
    CreateThemePaletteOptions,
    CreateThemeOptions,
    CreateThemeElevationOptions,
    CreateStyleObjectOrFunction,
    CreateStyleObject,
    CreateStyleFunctionProps,
    CreateStyleFunction,
    ReactElement,
} from './create'

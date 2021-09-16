// --------------------------
// theme
// --------------------------
export {
    ThemeContext,
    ThemeProvider,
    defaultTheme,
    createTheme,
    createThemeVars,
    createStyledComponent,
    createStyle,
    createTypography,
    createPalette,
    createElevation,
    isThemeColorName,
    useTheme,
} from './theme'

// --------------------------
// theme
// --------------------------
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
    CreateStyledComponentObjectOrFunction,
    CreateStyledComponentObject,
    CreateStyledComponentFunctionProps,
    CreateStyledComponentFunction,
    ReactElement,
} from './theme'

// --------------------------
// color
// --------------------------
export {
    RGBA,
    blue,
    common,
    createColor,
    darkGrey,
    getContrastRatio,
    getLuminous,
    getTintOrShade,
    green,
    grey,
    hex2rgba,
    isColorOrRGBA,
    isValidColorHex,
    purple,
    red,
    yellow,
    themeTernaryOperator,
} from './colors'

// --------------------------
// color
// --------------------------
export type { BasicColor, CreateColorOptions } from './colors'

// --------------------------
// typography
// --------------------------
export {
    defaultBoldFontWeight,
    defaultFontFamily,
    defaultLightFontWeight,
    defaultLineHeight,
    defaultRegularFontWeight,
    defaultThemeTypography,
    fontMixin,
    getFontSizeInRem,
    namedTypographyScales,
} from './typography'

// --------------------------
// typography
// --------------------------
export type { FontMixinReturn } from './typography'

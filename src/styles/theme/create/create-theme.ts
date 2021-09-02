import { CreateThemeOptions, Theme } from './create'
import { createPalette } from './create-palette'
import { createThemeVars } from './create-theme-vars'
import { createTypography } from './create-typography'

export const createTheme = (options = {} as CreateThemeOptions): Theme => {
    const {
        palette: paletteOptions = {},
        themeVars: themeVarsOptions = {},
        typography: typographyOptions = {},
    } = options

    const themeVars = createThemeVars(themeVarsOptions)
    const palette = createPalette(paletteOptions)
    const typography = createTypography(typographyOptions)

    return {
        themeVars,
        palette,
        typography,
    }
}

import { CreateThemeOptions, Theme } from './create'
import { createThemePalette } from './palette'
import { createThemeVars } from './theme-vars'
import { createThemeTypography } from './typography'
import { createThemeElevation } from './elevation'
import { createThemeBreakingPoints } from './breaking-points'
import { createThemeSpacing } from './spacing'

export const createTheme = (options = {} as CreateThemeOptions): Theme => {
    const {
        themeType = 'light',
        palette: paletteOptions = { themeType },
        themeVars: themeVarsOptions = {},
        typography: typographyOptions = {},
        elevation: elevationOptions = { themeType },
        spacing: spacingOptions = 0.25,
        breakingPoints: breakingPointsOptions = {},
    } = options

    const themeVars = createThemeVars(themeVarsOptions)
    const palette = createThemePalette(paletteOptions)
    const typography = createThemeTypography(typographyOptions)
    const elevation = createThemeElevation(elevationOptions)
    const spacing = createThemeSpacing(spacingOptions)
    const breakingPoints = createThemeBreakingPoints({
        ...breakingPointsOptions,
        baseFontSize: typography.meta.documentFontSize,
    })

    return {
        themeType,
        themeVars,
        palette,
        typography,
        elevation,
        spacing,
        breakingPoints,
    }
}

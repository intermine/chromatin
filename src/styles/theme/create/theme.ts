import { CreateThemeOptions, Theme } from './create'
import { createPalette } from './palette'
import { createThemeVars } from './theme-vars'
import { createTypography } from './typography'
import { createElevation } from './elevation'
import { createBreakingPoints } from './breaking-points'
import { createSpacing } from './spacing'

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
    const palette = createPalette(paletteOptions)
    const typography = createTypography(typographyOptions)
    const elevation = createElevation(elevationOptions)
    const spacing = createSpacing(spacingOptions)
    const breakingPoints = createBreakingPoints({
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

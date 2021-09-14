import { isProdEnv } from '../../../utils/misc'
import { CreateThemeOptions, Theme, ThemeColorName } from './create'
import { createPalette } from './create-palette'
import { createThemeVars } from './create-theme-vars'
import { createTypography } from './create-typography'
import { createElevation } from './create-elevation'

export const isThemeColorName = (
    colorName: string
): colorName is ThemeColorName => {
    if (typeof colorName !== 'string') {
        if (!isProdEnv()) {
            console.error(
                '[Chromatin - isThemeColorName]: Expecting '.concat(
                    'colorName as string. Got: ',
                    typeof colorName
                )
            )
        }
        return false
    }

    if (
        colorName === 'primary' ||
        colorName === 'secondary' ||
        colorName === 'error' ||
        colorName === 'warning' ||
        colorName === 'info' ||
        colorName === 'neutral'
    )
        return true
    return false
}
export const createTheme = (options = {} as CreateThemeOptions): Theme => {
    const {
        palette: paletteOptions = {},
        themeVars: themeVarsOptions = {},
        typography: typographyOptions = {},
        elevation: elevationOptions = {},
    } = options

    const themeVars = createThemeVars(themeVarsOptions)
    const palette = createPalette(paletteOptions)
    const typography = createTypography(typographyOptions)
    const elevation = createElevation(elevationOptions)

    return {
        themeVars,
        palette,
        typography,
        elevation,
    }
}

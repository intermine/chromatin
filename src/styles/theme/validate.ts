import { isProdEnv } from '../../utils'
import { ThemeColorName, ThemeTypographyVariant } from './create'

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
        colorName === 'success' ||
        colorName === 'error' ||
        colorName === 'warning' ||
        colorName === 'info' ||
        colorName === 'neutral' ||
        colorName === 'disable'
    )
        return true
    return false
}

export const isThemeFontVariant = (
    name: string
): name is ThemeTypographyVariant => {
    if (typeof name !== 'string') {
        if (!isProdEnv()) {
            console.error(
                '[Chromatin - isThemeFontVariant]: Expecting '.concat(
                    'name as string. Got: ',
                    typeof name
                )
            )
        }
        return false
    }

    if (
        name === 'h1' ||
        name === 'h2' ||
        name === 'h3' ||
        name === 'h4' ||
        name === 'h5' ||
        name === 'h6' ||
        name === 'body' ||
        name === 'bodyLg' ||
        name === 'bodySm' ||
        name === 'caption' ||
        name === 'title' ||
        name === 'small'
    )
        return true
    return false
}

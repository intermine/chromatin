import { CSSObject } from 'styled-components'

import type { CreateThemeVarsOptions, ThemeVars } from './create'

const themeVarDefaultFunction = (): CSSObject => ({})

export const createThemeVars = (
    options = {} as CreateThemeVarsOptions
): ThemeVars => {
    const {
        button = themeVarDefaultFunction,
        buttonBase = themeVarDefaultFunction,
        iconButton = themeVarDefaultFunction,
    } = options

    return {
        button,
        buttonBase,
        iconButton,
    }
}

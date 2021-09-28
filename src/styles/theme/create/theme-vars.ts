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
        buttonGroup = themeVarDefaultFunction,
        inputBase = themeVarDefaultFunction,
        input = themeVarDefaultFunction,
        box = themeVarDefaultFunction,
        grid = themeVarDefaultFunction,
        gridItem = themeVarDefaultFunction,
        spinner = themeVarDefaultFunction,
        typography = themeVarDefaultFunction,
        label = themeVarDefaultFunction,
        checkbox = themeVarDefaultFunction,
        radio = themeVarDefaultFunction,
        radioGroup = themeVarDefaultFunction,
    } = options

    return {
        button,
        buttonBase,
        iconButton,
        buttonGroup,
        inputBase,
        input,
        box,
        grid,
        gridItem,
        spinner,
        typography,
        label,
        checkbox,
        radio,
        radioGroup,
    }
}

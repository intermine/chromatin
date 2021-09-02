import { CSSProperties } from 'react'

import type { CreateThemeVarsOptions, ThemeVars } from './create'

const themeVarDefaultFunction = (): CSSProperties => ({})

export const createThemeVars = (
    options = {} as CreateThemeVarsOptions
): ThemeVars => {
    const { button = themeVarDefaultFunction } = options

    return {
        button,
    }
}

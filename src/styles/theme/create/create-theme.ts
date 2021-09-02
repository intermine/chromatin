import { Theme } from './create'
import { createThemeVars } from './create-theme-vars'

export const createTheme = (): Theme => {
    return {
        themeVars: createThemeVars(),
    }
}

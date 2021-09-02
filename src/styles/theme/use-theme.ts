import { useContext } from 'react'

import ThemeContext from './theme-context'
import { Theme } from './create'
import { defaultTheme } from './default-theme'

export const useTheme = (): Theme => {
    const theme = useContext(ThemeContext)

    if (theme) {
        return theme
    }

    return defaultTheme
}

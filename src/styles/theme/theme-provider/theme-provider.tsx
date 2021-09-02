import { Theme } from '../create'
import ThemeContext from '../theme-context'

export type ThemeProviderProps = {
    children?: React.ReactNode
    theme: Theme
}

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
    const { children, theme } = props

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    )
}

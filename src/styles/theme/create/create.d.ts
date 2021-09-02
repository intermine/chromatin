import { CSSProperties } from 'react'

export type ThemeVariableFunction<T> = (theme: Theme, props: T) => CSSProperties

export type ThemeVars = {
    button: ThemeVariableFunction<any>
}

export type CreateThemeVarsOptions = Partial<ThemeVars>

export type Theme = {
    themeVars: ThemeVars
}

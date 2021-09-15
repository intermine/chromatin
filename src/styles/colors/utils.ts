import type { ThemeType } from './color'

export const themeTernaryOperator = <T>(theme: ThemeType, v1: T, v2: T): T =>
    theme === 'light' ? v1 : v2
